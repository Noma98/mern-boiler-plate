import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';
import { useHistory } from 'react-router';

// ๐ฉoption
// null => ์๋ฌด๋ ์ถ์ ๊ฐ๋ฅํ ํ์ด์ง
// true => ๋ก๊ทธ์ธํ ์ ์ ๋ง ์ถ์ ๊ฐ๋ฅํ ํ์ด์ง
// false => ๋ก๊ทธ์ธํ ์ ์ ๋ ์ถ์ ๋ถ๊ฐ๋ฅํ ํ์ด์ง

// ๐ฉadminRoute => ๊ด๋ฆฌ์๋ง ์ถ์ ๊ฐ๋ฅํ  ๋ true, ๊ธฐ๋ณธ๊ฐ null
export function withAuth(SpecificComponent, option, adminRoute = null) {
    function AuthCheck(props) {
        const dispatch = useDispatch();
        const history = useHistory();

        useEffect(() => {
            dispatch(auth()).then(response => {
                console.log(response.payload);
                if (!response.payload.isAuth) {
                    //๋ก๊ทธ์ธX ์ํ
                    if (option) { //๋ก๊ทธ์ธํ ์ ์  OK์ธ ํ์ด์ง
                        history.push('/login');
                    }
                } else { //๋ก๊ทธ์ธO ์ํ
                    if (adminRoute) {//๊ด๋ฆฌ์๋ง OK์ธ ํ์ด์ง์ธ๋ฐ ๊ด๋ฆฌ์ ์๋ ๊ฒฝ์ฐ
                        history.push('/');
                    }
                    if (option === false) {//๋ก๊ทธ์ธ ์ํ ์ ์ ๋ง OK์ธ ํ์ด์ง
                        history.push('/');
                    }
                }
            });
        }, [history, dispatch])
        return (
            <SpecificComponent />
        )
    }
    return AuthCheck;
};
export default withAuth;