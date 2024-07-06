export const wait = async (ms) => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

export const formatDateWithSlash = date => {
  if (!date || date == '') return ''
  const [year, month, day] = date.split("-")
  return `${day}/${month}/${year}`
}