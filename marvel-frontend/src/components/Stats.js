import React  from 'react'
import Grid from '@mui/material/Unstable_Grid2';
import { Badge } from '@mui/material';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import EventIcon from '@mui/icons-material/Event';
import Divider from '@mui/material/Divider';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';

const Stats = (props) =>{
    return (
        <Grid container md={12}>
            <Grid xs={6} md={3}>
                <Grid container xs={12}>
                    <Grid xs={6} alignItems="right">
                        <p>Comics</p>
                    </Grid>
                    <Grid xs={5} alignItems="left">
                        <Badge badgeContent={props.available_comics} color="secondary">
                            <ImportContactsIcon color="action" />
                        </Badge>
                    </Grid>
                </Grid>
            </Grid>
            <Divider orientation="vertical" variant="middle" flexItem style={{marginRight:"-1px"}}/>
            <Grid xs={6} md={3}>
                <Grid container xs={12} m0>
                    <Grid xs={6} align-items-xs-right>
                        <p>Events</p>
                    </Grid>
                    <Grid xs={5} align-items-xs-left>
                        <Badge badgeContent={props.available_events} color="secondary">
                            <EventIcon color="action" />
                        </Badge>
                    </Grid>
                </Grid>
            </Grid>
            <Divider orientation="vertical" variant="middle" sx={{display: { xs: "none", lg: "block" }}} flexItem style={{marginRight:"-1px"}} />
            <Grid xs={6} md={3}>
                <Grid container xs={12}>
                    <Grid xs={6} align-items-xs-right>
                        <p>Series</p>
                    </Grid>
                    <Grid xs={5} align-items-xs-left>
                        <Badge badgeContent={props.available_series} color="secondary">
                            <LibraryBooksIcon color="action" />
                        </Badge>
                    </Grid>
                </Grid>
            </Grid>
            <Divider orientation="vertical" variant="middle" flexItem style={{marginRight:"-1px"}}/>
            <Grid xs={6} md={3}>
                <Grid container xs={12}>
                    <Grid xs={6} align-items-xs-right>
                        <p>Stories</p>
                    </Grid>
                    <Grid xs={5} align-items-xs-left>
                        <Badge badgeContent={props.available_stories} color="secondary">
                            <LocalLibraryIcon color="action" />
                        </Badge>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Stats;