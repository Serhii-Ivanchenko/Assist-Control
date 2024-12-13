import { useDispatch, useSelector } from "react-redux";
import MainContent from "../../components/MainContent/MainContent.jsx";
import { useEffect } from "react";
import { getUserData } from "../../redux/auth/operations.js";
import toast from "react-hot-toast";
import { selectUser } from "../../redux/auth/selectors.js";
import { setSelectedServiceId } from "../../redux/auth/slice.js";

export default function VideoControlPage() {
  // const dispatch = useDispatch();
  // const userData = useSelector(selectUser);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     await dispatch(getUserData())
  //       .unwrap()
  //       .then(() => {
  //         const serviceId = userData.services?.[0]?.id;

  //         if (serviceId) {
  //           dispatch(setSelectedServiceId(serviceId));
  //         }
  //       })
  //       .catch(() => {
  //         toast.error("Something went wrong. Please, try again");
  //       });
  //   };

  //   fetchUserData();
  // }, [dispatch]);

  return <MainContent />;
}
