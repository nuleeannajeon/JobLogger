import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FolderIcon from '@material-ui/icons/Folder';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import './styles.css';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

export default function LabelBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="footer">
      {/* Add component = {Link} into BottomNavAction  */}
      <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
        <BottomNavigationAction  to="#" label="Home" value="home" icon={<HomeIcon />} />
        <BottomNavigationAction  to="#" label="MyAccount" value="myaccount" icon={<AccountCircleIcon />} />
        <BottomNavigationAction  to="#" label="Search" value="search" icon={<SearchIcon />} />
        <BottomNavigationAction  to="#" label="Folder" value="folder" icon={<FolderIcon />} />
      </BottomNavigation>
    </div>
  );
}


