// API
import { defaultInstance, authInstance } from 'api/axios';
import requests from 'api/config';

// 개발 테스트용 토큰 발급 예시
const [token, setToken] = useState(null);

useEffect(() => {
  const get_token = async () => {
    try {
      const { data } = await defaultInstance.post(requests.TEST_TOKEN, {
        data: { userIdx: 1 },
      });
      setToken(data);
    } catch (error) {
      throw error;
    }
  };

  get_token();
}, []);

// post 예시
const post_user_review = async clickedReviewsIndex => {
  try {
    authInstance.post();
    const response = await authInstance.post(
      requests.POST_USER_REVIEW,
      {
        userIdx: 1,
        review_tag: clickedReviewsIndex,
      },

      {
        headers: {
          'access-token': `${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
