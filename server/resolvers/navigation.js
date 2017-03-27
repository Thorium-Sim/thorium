import App from '../../app';

export const NavigationQueries = {
  navigation(rootValue, {simulatorId}){
    let returnVal = App.systems.filter(s => s.type === 'Navigation');
    if (simulatorId){
      returnVal = returnVal.filter(s => s.simulatorId === simulatorId);
    }
    return returnVal;
  }
};

export const NavigationMutations = {
  navCalculateCourse(rootValue, args){
    App.handleEvent(args, 'navCalculateCourse');
  },
  navCancelCalculation(rootValue, args){
    App.handleEvent(args, 'navCancelCalculation');
  },
  navCourseResponse(rootValue, args){
    App.handleEvent(args, 'navCourseResponse');
  },
  navCourseEntry(rootValue, args){
    App.handleEvent(args, 'navCourseEntry');
  },
  navToggleCalculate(rootValue, args){
    App.handleEvent(args, 'navToggleCalculate');
  }
};

export const NavigationSubscriptions = {
  navigationUpdate(rootValue, {simulatorId}){
    let returnRes = rootValue;
    if (simulatorId) returnRes = returnRes.filter(s => s.simulatorId === simulatorId);
    return returnRes;
  }
};
