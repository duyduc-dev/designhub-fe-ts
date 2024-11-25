import RecentDesigns from '@/pages/HomePage/components/RecentDesigns';

import style from './home.module.scss';

const HomePage = () => {
  return (
    <div className={style.container}>
      <RecentDesigns />
    </div>
  );
};

export default HomePage;
