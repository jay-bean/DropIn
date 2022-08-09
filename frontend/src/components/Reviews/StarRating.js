import { useState } from "react";

function StarRating() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  console.log(rating)
  return (
    <div className="star-rating">
      {[...Array(5).keys()].map((index) => {
        index += 1;
        return (
          <button
            style={{backgroundColor: 'transparent', border: 'none'}}
            type="button"
            key={index}
            className={index <= rating || hover ? "on" : "off"}
            onClick={() => setRating(index)}
            onMouseOver={() => setHover(index)}
            onMouseOut={() => setHover(rating)}
          >
            <span>
              <img
                style={{width: '100px'}}
                src={index <= hover ? "https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/star+(1).png" : "https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/star.png"}
                alt={index <= rating || hover ? "filled star" : "empty star"}
              />
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
