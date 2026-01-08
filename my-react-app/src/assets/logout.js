import { useNavigate } from 'react-router-dom';
import { postApi } from '../services/apiService';
import { logoutUser } from '../redux/reducer';
import { useDispatch } from 'react-redux';

function useLogoutUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = async () => {
    try {
      await postApi('/auth/logout', {});
      localStorage.removeItem('token');
      dispatch(logoutUser());
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
      localStorage.removeItem('token');
      navigate('/');
    }
  };

  return logout;
}

export default useLogoutUser;