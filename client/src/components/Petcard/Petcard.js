import { useDispatch, useSelector } from "react-redux";

import { Link, useLocation } from "react-router-dom";
import { deletePets } from "../../auth/Redux/actions/PetActions";
<link
  href="https://fonts.googleapis.com/css2?family=Playfair+Display&family=Roboto:wght@300&display=swap"
  rel="stylesheet"
/>;

function PetCard({ Pets }) {
  const user = useSelector((state) => state.authReducer.user);
  const deletePet = useSelector((state) => state.PetReducer.Pets);
  const dispatch = useDispatch();
  const location = useLocation();
  return (
    <div key={Pets._id}>
      <div className="container">
        <div className="card">
          <figure className="card__thumb">
            <img
              src={Pets.Image}
              alt=" pic by Kyle Cottrell"
              className="card__image"
            />

            <figcaption className="card__caption">
              <h2 className="card__title">{Pets && Pets.CreatedBy.Name}</h2>
              <h2 className="card__title">Title: {Pets.Title}</h2>
              <p className="card__snippet">Description: {Pets.Description}</p>
              <a className="card__button">{Pets && Pets.CreatedBy.Phone}</a>
            </figcaption>
          </figure>
          {(user &&
            user._id === Pets.CreatedBy.Id &&
            location.pathname === "/Profile") ||
          location.pathname === "/Manage" ? (
            <div className="flex justify-center items-center">
              <button
                className="px-5 text-center cursor-pointer mx-3 my-5 inline-block text-center bg-gray-600 border border-transparent rounded-md py-2  font-medium text-white hover:bg-red-500"
                onClick={() => dispatch(deletePets({ id: Pets._id }))}
              >
                Delete
              </button>

              {location.pathname === "/Profile" ? (
                <Link to={`/EditPet/${Pets._id}`}>
                  <button className=" px-5 text-center cursor-pointer mx-3 my-5 inline-block text-center bg-gray-600 border border-transparent rounded-md py-2  font-medium text-white hover:bg-green-500">
                    Edit
                  </button>
                </Link>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default PetCard;
