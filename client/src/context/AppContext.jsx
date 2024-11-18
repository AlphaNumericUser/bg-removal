import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import { createContext, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const [credit, setcredit] = useState(false);
    const [image, setImage] = useState(false);
    const [resultImage, setResultImage] = useState(false);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    const { getToken } = useAuth();
    const { isSignedIn } = useUser();
    const { openSignIn } = useClerk();
    
    const loadCreditsData = async () => {
        try {
            const token = await getToken();
            const response = await axios.get(`${backendUrl}/api/user/credits`, { headers: { token } });
            const { data } = response;
            console.log(data);
            if (data.success) {
                setcredit(data.data);
                console.log(data.data);
            }
        } catch (error) {
            console.log("Entramos al catch");
            console.error(error);
            toast.error(error.message);
        }
    }

    const removeBG = async (image) => {
        try {
            if (!isSignedIn) {
                return openSignIn();
            }
            setImage(image);
            setResultImage(false);
            navigate('/result');
            const token = await getToken();
            const formData = new FormData();
            image && formData.append('image', image);
            const { data } = await axios.post(`${backendUrl}/api/image/remove-bg`, formData, { headers: { token } });
            if (data.success) {
                setResultImage(data.resultImage);
                data.creditBalance && setcredit(data.creditBalance);
            } else {
                toast.error(data.message);
                data.creditBalance && setcredit(data.creditBalance);
                if (data.creditBalance === 0) {
                    navigate('/buy');
                }
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    }

    const value = {
        credit, setcredit, loadCreditsData, backendUrl, image, setImage, removeBG, resultImage, setResultImage
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

AppContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AppContextProvider;