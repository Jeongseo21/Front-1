import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Grid from "@material-ui/core/Grid";
import EditIcon from '@material-ui/icons/Edit';

import "../../styles/style.css";
import { SessionConfirm } from "./SessionConfirm";
import { getSessionInfo, getUserSessionInfo } from '../../actions/SessionActions'

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    // position: 'relative',
    // float: 'left',
    // display: 'inline-block',
    margin: "2%",
    width: '100%',
    height: '10em',
    // left: '-50%',
    maxWidth: "30em",
    borderRadius: "20px",
    boxShadow: "1px 1px 8px 0px rgb(0, 0, 0, 0.3)",
    // backgroundColor: 'aquamarine',
  },
  media: {
    cursor: "pointer",
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  cardContent: {
    height: "inherit",
  },
  cookieWrapper: {
    float: "left",
    width: "6em",
    height: "6em",
    marginLeft: "1em",
    backgroundPosition: "center center",
    backgroundSize: "100%",
    backgroundRepeat: "no-repeat",
    overflow: "hidden",
  },
  useCookie: {
    float: "left",
    margin: "auto",
    backgroundImage: "url('/static/cookieMould.png')",
    backgroundPosition: "center center",
    backgroundSize: "100%",
    width: "6em",
    height: "inherit",
    overflow: "hidden",
  },
  layerfordark: {
    position: 'fixed',
    maxWidth: '73em',
    minHeight: '35em',
    marginLeft: 'auto',
    marginRight: 'auto',
    left: 0,
    right: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    opacity: '0.6',
    transition: 'all 0.7s'
},
}));

const MypageLiveSession = ({ session, setFlag }) => {
  console.log("마이라이브세션", session);
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [listup, setListUp] = useState({ transform: "translate(0, 100%)" });
  const [dark, setDark] = useState({ transform: "translate(0, 100%)", display: "none" });

  const onDelete = async () => {
    console.log("DELETE SESSION!");
    // await postSessionDelete(session);
    const config = {
      headers: { Authorization: "Token " + localStorage.token },
    };

    await axios.delete(
      "https://143.248.226.51:8000/api/hole/delete/" + session.id,
      config
    );
    console.log("hole deleted: ");
    history.push('/mypage');
  };


  if (!session) return null;
  return (
    <>
      <Grid container item direction='row' justify='center' style={{width:'100%', maxWidth: '30em', float:'left', margin:'auto'}}>
        <Card key={session.livehole_id} className={classes.root}>
          <br></br>

          <div
            style={{ backgroundImage: "url('/static/live_IU2.png')" }}
            className={classes.cookieWrapper}
          >
            <div className={classes.useCookie}></div>{" "}
          </div>

          {console.log(session.title)}
          <CardHeader
          style={{padding: '10px 8px 0 8px'}}
            title={<Typography variant="h6">{session.title}</Typography>}
            subheader={Date(session.reserve_date).substring(0, 21)}
            action={
              <IconButton aria-label="settings"
                onClick={() =>
                  {
                    <>
                    {console.log("CLICK")}
                    {console.log(session)}
                    {history.push({
                    pathname: `mypage/hole/${session.id}/edit`,
                    state: session
                  })}
                    </>

                  }
                }
              >
                <EditIcon />
              </IconButton>
            }
          />
          {session.status != "DONE" &&
          <CardContent>
            <CardActions style={{padding: '0 0'}}>
              <Button
                size="large"
                color="primary"
                onClick={() => {
                  setListUp({ transform: "translate(0, 50%)" });
                  setDark({ animation: "godark 0.7s" });
                }}
              >
                <Typography variant="body1" style={{ fontWeight: 600 }}>
                  예약 확정하기
                </Typography>
              </Button>
              <Button size="large" color="primary" onClick={() => {
                <>
                {onDelete()}
                {dispatch(getUserSessionInfo())}
                {setFlag(true)}
                </>
              }
              }>
                <Typography variant="body1" style={{ fontWeight: 600 }}>
                  삭제하기
                </Typography>
              </Button>
            </CardActions>
          </CardContent>
}
        </Card>
      </Grid>

      <div style={listup} className="hiddenlist" maxWidth="">
        <SessionConfirm
          session={session}
          goListUp={setListUp}
          goDark={setDark}
        />
      </div>
      <div style={dark} className="mypagelayerfordark"></div>
    </>
  );
};

export default MypageLiveSession;
