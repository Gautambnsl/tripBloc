// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract TripBloc {
    address public platformOwner;

    enum ProposalStatus { Pending, Accepted, Rejected }
    enum RequestStatus { Pending, Approved, Rejected }

    struct Hotel {
        address owner;
        string ensName; // ENS name of the hotel owner
        uint256 stakingFee;
        uint256 roomFee; // New field for room fee
        mapping(uint256 => Proposal) proposals;
        uint256[] proposalIds; // Track proposal IDs for the hotel
        //comments are loaded 
        
    }

    struct Proposal {
        address user;
        uint256 date;
        uint256 paymentAmount;
        ProposalStatus status;
    }

    struct Request {
        address requester;
        uint256 requestId;
        uint256 paymentAmount;
        RequestStatus status;
    }

    mapping(uint256 => Hotel) public hotels;
    mapping(uint256 => Request) public requests;

    event HotelRegistered(uint256 hotelId, address owner, string ensName, uint256 stakingFee, uint256 roomFee);
    event ProposalSubmitted(uint256 hotelId, address user, uint256 date, uint256 paymentAmount, uint256 proposalId);
    event ProposalStatusUpdated(uint256 hotelId, uint256 proposalId, ProposalStatus status);
    event RequestRaised(uint256 requestId, address requester, uint256 paymentAmount);
    event RequestStatusUpdated(uint256 requestId, RequestStatus status);

    modifier onlyPlatformOwner() {
        require(msg.sender == platformOwner, "Only platform owner can call this function");
        _;
    }

    modifier onlyHotelOwner(uint256 hotelId) {
        require(msg.sender == hotels[hotelId].owner, "Only hotel owner can call this function");
        _;
    }

    modifier isValidHotel(uint256 hotelId) {
        require(hotels[hotelId].stakingFee > 0, "Hotel does not exist");
        _;
    }

    modifier isValidProposal(uint256 hotelId, uint256 proposalId) {
        require(hotels[hotelId].proposals[proposalId].user != address(0), "Proposal does not exist");
        _;
    }

    modifier isValidRequest(uint256 requestId) {
        require(requests[requestId].requester != address(0), "Request does not exist");
        _;
    }

    constructor() public {
        platformOwner = msg.sender;
    }

    function registerHotel(uint256 hotelId, string memory ensName, uint256 roomFee) external payable {
        require(hotels[hotelId].stakingFee == 0, "Hotel already registered");
        require(msg.value > 0, "Staking fee must be greater than 0");

        Hotel storage newHotel = hotels[hotelId];
        newHotel.owner = msg.sender;
        newHotel.ensName = ensName;
        newHotel.stakingFee = msg.value;
        newHotel.roomFee = roomFee;

        emit HotelRegistered(hotelId, msg.sender, ensName, msg.value, roomFee);
    }

    function sendProposal(uint256 hotelId, uint256 date, uint256 paymentAmount) external payable isValidHotel(hotelId) {
        require(msg.value == paymentAmount, "Incorrect payment amount");

        uint256 proposalId = 0;//hotels[hotelId].proposalIds.length; // Unique proposal ID
        hotels[hotelId].proposals[proposalId] = Proposal({
            user: msg.sender,
            date: date,
            paymentAmount: paymentAmount,
            status: ProposalStatus.Pending
        });

        hotels[hotelId].proposalIds.push(proposalId); // Store the proposal ID
        emit ProposalSubmitted(hotelId, msg.sender, date, paymentAmount, proposalId);
    }

    function getHotelProposalIds(uint256 hotelId) external view isValidHotel(hotelId) returns (uint256[] memory) {
        return hotels[hotelId].proposalIds;
    }

    function getProposalInfo(uint256 hotelId, uint256 proposalId) external view isValidHotel(hotelId) isValidProposal(hotelId, proposalId) returns (
        address user,
        uint256 date,
        uint256 paymentAmount,
        ProposalStatus status
    ) {
        Proposal storage proposal = hotels[hotelId].proposals[proposalId];
        return (proposal.user, proposal.date, proposal.paymentAmount, proposal.status);
    }

    function acceptProposal(uint256 hotelId, uint256 proposalId) external isValidHotel(hotelId) onlyHotelOwner(hotelId) isValidProposal(hotelId, proposalId) {
        hotels[hotelId].proposals[proposalId].status = ProposalStatus.Accepted;
        // Transfer payment to the hotel owner
        payable(hotels[hotelId].owner).transfer(hotels[hotelId].proposals[proposalId].paymentAmount);
        emit ProposalStatusUpdated(hotelId, proposalId, ProposalStatus.Accepted);
    }

    function rejectProposal(uint256 hotelId, uint256 proposalId) external onlyPlatformOwner isValidProposal(hotelId, proposalId) {
        hotels[hotelId].proposals[proposalId].status = ProposalStatus.Rejected;
        // Refund payment to the user
        payable(hotels[hotelId].proposals[proposalId].user).transfer(hotels[hotelId].proposals[proposalId].paymentAmount);
        emit ProposalStatusUpdated(hotelId, proposalId, ProposalStatus.Rejected);
    }

    function raiseRequest(uint256 requestId, uint256 paymentAmount) external payable {
        require(msg.value == paymentAmount, "Incorrect payment amount");

        requests[requestId] = Request({
            requester: msg.sender,
            requestId: requestId,
            paymentAmount: paymentAmount,
            status: RequestStatus.Pending
        });

        emit RequestRaised(requestId, msg.sender, paymentAmount);
    }

    function approveRequest(uint256 requestId) external onlyPlatformOwner isValidRequest(requestId) {
        requests[requestId].status = RequestStatus.Approved;
        // Transfer payment to the requester
        payable(requests[requestId].requester).transfer(requests[requestId].paymentAmount);
        emit RequestStatusUpdated(requestId, RequestStatus.Approved);
    }

    function rejectRequest(uint256 requestId) external onlyPlatformOwner isValidRequest(requestId) {
        requests[requestId].status = RequestStatus.Rejected;
        // Refund payment to the requester
        payable(requests[requestId].requester).transfer(requests[requestId].paymentAmount);
        emit RequestStatusUpdated(requestId, RequestStatus.Rejected);
    }
}
