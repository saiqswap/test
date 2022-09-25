import {
  Box,
  Card,
  CardHeader,
  Grid,
  Step,
  StepContent,
  StepLabel,
  Stepper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { useSelector } from "react-redux";
import {
  FAKE_MINTING_BOXES,
  FAKE_MINTING_COMBOS,
} from "../../settings/constants";
import Loader from "../common/Loader";
import StaticRoundBoxDetail from "./StaticRoundBoxDetail";
import StaticRoundComboDetail from "./StaticRoundComboDetail";
import Title from "./Title";

const CustomContainer = styled(Box)(() => ({
  marginTop: 50,
}));
const CustomCard = styled(Card)(({ theme }) => ({
  height: "100%",
  width: "100%",
  minHeight: "50vh",
  backgroundColor: "rgba(0, 51, 98, 0.1)!important",
  boxShadow: "none",
  padding: "2rem",
  position: "relative",
  backdropFilter: "blur(20px)",
  // zIndex: 99,
  [theme.breakpoints.down("sm")]: {
    padding: "0px 1rem 0px 0px",
  },
  [theme.breakpoints.down("sm")]: {
    borderRadius: 0,
    padding: "20px",
  },
  "&:before": {
    content: '""',
    width: "2px",
    height: "100%",
    background: "var(--border-color)",
    position: "absolute",
    top: 0,
    left: "5.5rem",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
}));
const CustomStep = styled(Stepper)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    marginLeft: "-1rem",
    "& .MuiStepContent-root": {
      position: "relative",
      paddingBottom: "2rem",
    },
  },
  "& .MuiStepConnector-root": {
    height: "100px",
    [theme.breakpoints.down("md")]: {
      width: "150vw",
      marginLeft: "-10vw",
      background: "var(--border-color)",
      height: "10px",
      marginBottom: "20px",
    },
  },
  "& .MuiStepLabel-iconContainer svg": {
    width: "50px",
    height: "50px",
    color: "var(--border-color)",
    position: "relative",
    zIndex: 100,
    border: "3px solid var(--border-color)",
    borderRadius: "100px",
    "& text": {
      fill: "var(--main-color)",
      fontWeight: "bold",
    },
  },
  "& .MuiStepConnector-line": {
    opacity: 0,
  },
  "& .MuiStepLabel-labelContainer": {
    paddingLeft: "1rem",
  },
  "& .MuiStepContent-root": {
    paddingLeft: "6rem",
    borderLeft: "none",
    [theme.breakpoints.down("md")]: {
      paddingLeft: "0px",
    },
  },
  "& .MuiStepLabel-root": {
    [theme.breakpoints.down("md")]: {
      marginLeft: "0px",
    },
  },
  "& .MuiStepLabel-iconContainer": {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
}));
export default function StaticMintingList() {
  const { setting } = useSelector((state) => state);
  const { library } = setting;
  const mintingBoxList = FAKE_MINTING_BOXES;
  const mintingComboList = FAKE_MINTING_COMBOS;

  return mintingBoxList && mintingComboList ? (
    <>
      <CustomContainer>
        <CustomCard>
          <CustomStep orientation="vertical">
            {mintingBoxList.map((round, index) => {
              return (
                <Step
                  key={index}
                  active={true}
                  className={index === mintingBoxList.length - 1 ? "end" : ""}
                >
                  <StepLabel sx={{ marginLeft: "2rem" }}>
                    <CardHeader
                      sx={{ padding: 0 }}
                      title={
                        <Title
                          variant="h5"
                          sx={{
                            textAlign: "left",
                            width: "fit-content",
                            fontWeight: 700,
                          }}
                        >
                          {index === 0
                            ? "Minting OG Sale"
                            : `Minting WL R${index}`}
                        </Title>
                      }
                    />
                  </StepLabel>
                  <StepContent sx={{ width: "100%", mt: 1 }}>
                    <Grid container spacing={5}>
                      <Grid item xs={12} md={6}>
                        <StaticRoundBoxDetail round={round} />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        {mintingComboList[index] ? (
                          <StaticRoundComboDetail
                            round={mintingComboList[index]}
                            library={library}
                          />
                        ) : null}
                      </Grid>
                    </Grid>
                  </StepContent>
                </Step>
              );
            })}
          </CustomStep>
        </CustomCard>
      </CustomContainer>
    </>
  ) : (
    <Loader />
  );
}