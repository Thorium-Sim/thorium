import App from '../../app';

const updateReactor = () => {
  const level = App.systems.reduce((prev, sys) => {
    return prev + sys.power.power;
  }, 0);
  console.log(level);
  setTimeout(updateReactor, 1000);
};
updateReactor();