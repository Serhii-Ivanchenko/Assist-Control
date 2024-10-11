import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { validateEmail } from "../../redux/auth/operations";
import Loader from "../../components/Loader/Loader";
import { selectLoading } from "../../redux/auth/selectors";
import toast from "react-hot-toast";

export default function ValidateEmailPage() {
  const { api_key } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectLoading);

  //   useEffect(() => {
  //     dispatch(validateEmail(apiKey));
  //   }, [dispatch, apiKey])
  //     .unwrap()
  //     .then(navigate("/video-control"))
  //     .catch((error) => {if (error.status === 401) {                       <==========================
  //   toast.error("Неправильний ключ або користувач не знайдений", {
  //     position: "top-center",
  //     style: {
  //       background: "#242525",
  //       color: "#FFFFFF",
  //     },
  //   });
  // } else {
  //       toast.error("Щось сталося, спробуйте ще раз", {
  //         position: "top-center",
  //         style: {
  //           background: "#242525",
  //           color: "#FFFFFF",
  //         },
  //       });}                                                                  <========================
  //     });
  useEffect(() => {
    dispatch(validateEmail(api_key))
      .unwrap()
      .then(
        toast.success("Email validated")
        // navigate("/video-control")
      )
      .catch((error) => {
        toast.error("Щось сталося, спробуйте ще раз", {
          position: "top-center",
          style: {
            background: "#242525",
            color: "#FFFFFF",
          },
        });
      });
  }, [dispatch, api_key]);

  return (
    <div>
      {isLoading && <Loader />}
      <p>Validate Email</p>
    </div>
  );
}
