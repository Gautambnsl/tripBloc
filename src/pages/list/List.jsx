import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import { format } from 'date-fns';
import { DateRange } from 'react-date-range';
import './list.css';
import '../../components/navbar/navbar.css';
import '../../components/header/header.css';
import SearchItem from '../../components/searchItem/SearchItem';

const List = () => {
  const mockHotels = [
    {
      _id: 'hotel1',
      photos: [
        'https://images.unsplash.com/photo-1517840901100-8179e982acb7?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWx8ZW58MHx8MHx8fDA%3D',
        'https://plus.unsplash.com/premium_photo-1675745329954-9639d3b74bbf?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWx8ZW58MHx8MHx8fDA%3D',
        'https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWx8ZW58MHx8MHx8fDA%3D',
      ],
      name: 'Hotel Sunshine',
      distance: '500m from city center',
      description:
        'This is a delightful hotel offering sunny rooms and wonderful service, close to all the attractions.',
      rating: 8.5,
      cheapestPrice: 120,
      address:'500m from city center',
      title: 'Mountain Escape'
    },
    {
      _id: 'hotel2',
      photos: [
        'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG90ZWx8ZW58MHx8MHx8fDA%3D',
        'https://images.unsplash.com/photo-1679678691263-cc7f30ce02f8?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxzZWFyY2h8OHx8aG90ZWx8ZW58MHx8MHx8fDA%3D',
        'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvdGVsfGVufDB8fDB8fHww',
      ],
      name: 'Oceanview Retreat',
      distance: '200m from the beach',
      description:
        'Experience breathtaking ocean views and relaxing beachside living at our tranquil retreat.',
      rating: 9.0,
      cheapestPrice: 150,
      address:'500m from city center',
      title: 'Mountain Escape'
    },
    {
      _id: 'hotel3',
      photos: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGhvdGVsfGVufDB8fDB8fHww',
        'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGhvdGVsfGVufDB8fDB8fHww',
        'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGhvdGVsfGVufDB8fDB8fHww',
      ],
      name: 'Mountain Escape',
      distance: 'Located in the mountain range',
      description:
        'Surrounded by mountains, this secluded escape provides the perfect getaway for nature lovers.',
      rating: 8.7,
      cheapestPrice: 95,
      address:'500m from city center',
      title: 'Mountain Escape'
    },
  ];
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const { data, loading, error, reFetch } = useFetch(
    `/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`
  );

  const handleClick = () => {
    reFetch();
  };
  return (
    <>
      <Navbar type="list" />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input placeholder={destination} type="text" />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,
                'MM/dd/yyyy'
              )} to ${format(dates[0].endDate, 'MM/dd/yyyy')}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {loading ? (
              'loading'
            ) : (
              <>
                {mockHotels.map((item) => (
                  <>
                    <SearchItem item={item} key={item._id} />
                  </>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default List;
