/* eslint-disable */
const singleTime = (splitTime) => {
  let formattedTime = [];
  let arg = null;
  let searchChar = '';
  
  if (!Array.isArray(splitTime)) {
    arg = [splitTime]
  } else {
    arg = splitTime
  }
  
  if (arg[0].includes('m')) {
    searchChar = 'm';

  } else if (arg[0].includes('h')) {
    searchChar = 'h';
  }

  const indexOfChar = arg[0].indexOf(searchChar);
  const subNumber = arg[0].substring(0, indexOfChar);

  formattedTime.push(subNumber);

  if (searchChar === 'm') {
    formattedTime.push('minutes');
  } else if (searchChar === 'h' && subNumber > 1) {
    formattedTime.push('hours');
  } else if (searchChar === 'h') {
    formattedTime.push('hour');
  }

  return formattedTime;
}

const formatTime = (time) => {
  let formattedTime = [];
  const lowerCaseTime = time.toLowerCase();
  const splitTime = lowerCaseTime.split(' ');

  splitTime.forEach(item => {
    if (splitTime.length === 1) {
      formattedTime.push(...singleTime(splitTime));
    } else if (!isNaN(item)) {
      formattedTime.push(item);
    } else if (item.includes('h') && formattedTime[0] > 1) {
      if (item.indexOf('h') > 0) {
        formattedTime.push(...singleTime(item));
      } else {
        formattedTime.push('hours');
      }
    } else if (item.includes('h')) {
      if (item.indexOf('h') > 0) {
        formattedTime.push(...singleTime(item));
      } else {
        formattedTime.push('hour');
      }
    } else if (item.includes('m')) {
      if (item.indexOf('m') > 0) {
        formattedTime.push(...singleTime(item));
      } else {
        formattedTime.push('minutes');
      }
    }
  });

  const result = formattedTime.join(' ');
  return result;
};

module.exports = formatTime;
