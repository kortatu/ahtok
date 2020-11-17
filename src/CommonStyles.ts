import {makeStyles} from "@material-ui/core/styles";
import {createStyles, Theme} from "@material-ui/core";

export const useModalStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            position: 'relative',
            left: "15%",
            top: "25%",
            width: "70%",
            opacity: 0.9,
            backgroundColor: theme.palette.background.paper,
            border : '2px solid',
            borderColor: theme.palette.secondary.main,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }),
);