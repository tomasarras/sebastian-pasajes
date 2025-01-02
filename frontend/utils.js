export const tableCustomStyles = {
  headRow: {
    style: {
      color:'white',
      backgroundColor: '#003033',
      borderRadius: '5px 5px 0px 0px'
    },
  },
  rows: {
    style: {
      maxHeight: '120px',
      color: "black",
      backgroundColor: "white"
    },
    stripedStyle: {
      color: "black",
      backgroundColor: "white"
    }
  },
  cells: {
    style: {
      '&:not(:last-of-type)': {
        borderRightStyle: 'solid',
        borderRightWidth: '1px',
        borderRightColor: 'rgba(0,0,0,.12)',
      },
    },
  },
  pagination: {
    style: {
      color:'grey',
      backgroundColor: 'white'
    },
    pageButtonsStyle: {
      borderRadius: '50%',
      height: '40px',
      width: '40px',
      padding: '8px',
      margin: 'px',
      cursor: 'pointer',
      transition: '0.4s',
      color: 'grey !important',
      fill: 'grey !important',
      backgroundColor: 'transparent',
      '&:disabled': {
        cursor: 'unset',
        color: 'grey',
        fill: 'grey',
      },
      '&:hover:not(:disabled)': {
        backgroundColor: 'grey',
        color: 'grey',
        fill: 'grey',
      },
      '&:focus': {
        outline: 'none',
        backgroundColor: 'white',
      },
    },
  },
}

const copy = { ...tableCustomStyles }
copy.rows.style.cursor = "pointer"
copy.rows.style["&:hover"] = { backgroundColor: "#f0f0f0" }
export const linkeableTableCustomStyles = copy