import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import Collapse from '@mui/material/Collapse';
import { Link } from 'react-router-dom';

const SideBar = () => {
  const theme = useTheme();
  const [openMenu, setOpenMenu] = React.useState(false);

  const handleClick = (params) => {
    // console.log(openMenu);
    if (openMenu === params) {
      setOpenMenu(false);
    } else {
      setOpenMenu(params);
    }
  };

  const menuItems = [
    {
      title: "Products",
      submenu: [],
      icon: <InboxIcon />,
      to: '/admin/products',
    },
    {
      title: "One",
      icon: <InboxIcon />,
      submenu: [
        {
          title: "Two design",
          href: "#",
          icon: <InboxIcon />
        },
        {
          title: "Two development",
          icon: <InboxIcon />
        },
        {
          title: "Two SEO",
          icon: <InboxIcon />
        }
      ]
    },
    {
      title: "Two",
      submenu: [],
      icon: <InboxIcon />
    },
    {
      title: "Starred",
      icon: <InboxIcon />,
      submenu: [
        {
          title: "web design",
          icon: <InboxIcon />
        },
        {
          title: "web development",
          icon: <InboxIcon />
        },
        {
          title: "SEO",
          icon: <InboxIcon />
        }
      ]
    }
  ];

  return (
    <>
      <Divider />
      <List>
        {
          menuItems.map(function (object, i) {
            return (
              <div key={'mmslist_' + i}>
                <ListItem key={'mmlist_' + i} disablePadding onClick={(e) => object?.submenu?.length > 0 && handleClick(object.title)}>
                  {/* <Link to={object?.submenu?.length > 0 ? '#' : '/admin/products'}> */}
                  <ListItemButton component={Link} to="/admin/products">
                    <ListItemIcon>
                      {/* {i % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                      {object?.icon}
                    </ListItemIcon>

                    <ListItemText primary={object?.title} />
                    {object?.submenu?.length > 0 && (object.title === openMenu ? <ExpandLess /> : <ExpandMore />)}
                  </ListItemButton>
                  {/* </Link> */}
                </ListItem>
                {(() => {
                  if (object?.submenu?.length > 0) {
                    return (
                      <Collapse key={'coll_' + i} in={object.title === openMenu} timeout="auto" unmountOnExit>
                        <List key={'colllist_' + i} component="div" disablePadding>
                          {
                            object?.submenu?.map(function (object2, i2) {
                              return (
                                <ListItem key={'ddlist_' + i2} disablePadding >
                                  <ListItemButton sx={{ pl: 4 }} key={'ddlist1_' + i2}>
                                    <ListItemIcon>
                                      <StarBorder />
                                    </ListItemIcon>
                                    <ListItemText primary={object2?.title} />
                                  </ListItemButton>
                                </ListItem>
                              )
                            })
                          }
                        </List>
                      </Collapse>
                    )
                  }
                })()}
              </div>
            )
          })
        }
      </List>
    </>
  )
}

export default SideBar;
