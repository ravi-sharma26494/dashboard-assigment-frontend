import React from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import "./small.card.styles.css";

const SmallCard = ({
  icon,
  title,
  subtitle,
  number,
  additionalInfo,
  className,
}) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Stack
        className="stack-container"
        id={className}
        direction="column"
        color="#716E7A"
        component={Card}
        spacing={1}
        useFlexGap
        sx={{
          p: 3,
          height: "100%",
        }}
      >
        <Box
          sx={{
            opacity: "50%",
            display: "flex",
            textAlign: "center",
            gap: 2,
          }}
        >
          <div className={`card-icon ${className}`}>{icon}</div>
          <Typography
            fontWeight="medium"
            gutterBottom
            className="card-title"
            sx={{ alignSelf: "flex-end" }}
          >
            {title && title.toUpperCase()}
          </Typography>
        </Box>
        <div>
          <Typography
            variant="body2"
            sx={{ color: "#2F2B3D7" }}
            className="card-subtitle"
            style={{ color: "#2f2b3dc7", fontSize: "20px" }}
          >
            {subtitle}
          </Typography>
          <div className="card-description-wrapper">
            <span className="card-number">{number}</span>
            <Typography
              variant="body2"
              sx={{ color: "#2F2B3D7" }}
              className="card-description"
            >
              {additionalInfo}
            </Typography>
          </div>
        </div>
      </Stack>
    </Grid>
  );
};

export default SmallCard;
