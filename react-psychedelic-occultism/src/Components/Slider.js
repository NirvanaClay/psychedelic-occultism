import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

const Slider = ({ items }) => {
  const [leftArrowVisibility, setLeftArrowVisibility] = useState(false);
  const [rightArrowVisibility, setRightArrowVisibility] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [rightHover, setRightHover] = useState(false);
  const [leftHover, setLeftHover] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(0);

  const location = useLocation()

  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  console.log("items being passed in to Slider are:")
  console.log(items)

  useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const large = window.matchMedia('(max-width: 992px)');
  const medium = window.matchMedia('(max-width: 768px)');
  const small = window.matchMedia('(max-width: 576px)');
  const xSmall = window.matchMedia('(max-width: 320px)');

  let sliderWidth;
  let itemsPerPage;

  if (large.matches && !medium.matches && !small.matches && !xSmall.matches) {
    sliderWidth = 750;
    itemsPerPage = 3;
  } else if (medium.matches && !small.matches && !xSmall.matches) {
    sliderWidth = 570;
    itemsPerPage = 3;
  } else if (small.matches && !xSmall.matches) {
    sliderWidth = 320;
    itemsPerPage = 2;
  } else if (xSmall.matches) {
    sliderWidth = 240;
    itemsPerPage = 2;
  } else {
    sliderWidth = 900;
    itemsPerPage = 4;
  }

  const toggleLeftHover = () => {
    setLeftHover(!leftHover);
  };

  const toggleRightHover = () => {
    setRightHover(!rightHover);
  };

  const moveSliderLeft = () => {
    setSliderPosition(sliderPosition + sliderWidth);
  };

  const moveSliderRight = () => {
    setSliderPosition(sliderPosition - sliderWidth);
  };

  const updateSliderState = (items) => {
    if (items) {
      const itemCount = items.length;
      if (itemCount % itemsPerPage !== 0) {
        setTotalPages(Math.floor(itemCount / itemsPerPage) + 1);
      } else {
        setTotalPages(Math.floor(itemCount / itemsPerPage));
      }
      setCurrentPage((sliderPosition / -sliderWidth) + 1);
      if (currentPage < totalPages) {
        setRightArrowVisibility(true);
      } else {
        setRightArrowVisibility(false);
      }
      if (currentPage > 1) {
        setLeftArrowVisibility(true);
      } else {
        setLeftArrowVisibility(false);
      }
    }
  };

  useEffect(() => {
    updateSliderState(items);
  }, [items, sliderPosition, currentPage, totalPages]);

  let seriesSliderPosition = {
    left: sliderPosition + 'px',
  };

  return (
    <div className='slider-container'>
      <div
        className={`left-arrow__container ${leftHover && 'inverted-bg'} ${
          leftArrowVisibility && 'visible'
        }`}
        onMouseEnter={toggleLeftHover}
        onMouseLeave={toggleLeftHover}
        onClick={moveSliderLeft}
      >
        <i className={`fas fa-arrow-left left-arrow ${leftHover && 'inverted'}`}></i>
      </div>
      <div
        className={`right-arrow__container ${rightHover && 'inverted-bg'} ${
          rightArrowVisibility && 'visible'
        }`}
        onMouseEnter={toggleRightHover}
        onMouseLeave={toggleRightHover}
        onClick={moveSliderRight}
      >
        <i className={`fas fa-arrow-right right-arrow ${rightHover && 'inverted'}`}></i>
      </div>
      <div className='books' style={seriesSliderPosition}>
        {items && items.map((item, index) => (
          <div key={index} className='book'>
            <a href={`${location.pathname}/sources/${item._id}`}>
              <img src={item.image} alt={item.title} />
            </a>
            <a href={`${location.pathname}/sources/${item._id}`}>
              <h3>{item.title}</h3>
            </a>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
