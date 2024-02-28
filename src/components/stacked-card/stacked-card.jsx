import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import AutoFixHighRoundedIcon from "@mui/icons-material/AutoFixHighRounded";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";
import QueryStatsRoundedIcon from "@mui/icons-material/QueryStatsRounded";
import SettingsSuggestRoundedIcon from "@mui/icons-material/SettingsSuggestRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";

import FlashOnIcon from "@mui/icons-material/FlashOn";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import AddModeratorIcon from "@mui/icons-material/AddModerator";

import "./stacked-card.styles.css";
import {
  calculateMostHotTopic,
  calculateMostRelevantTopic,
  calculateTopRegions,
  determineTopInsightSource,
} from "../../utils/data-calculation";
import SmallCard from "../card/small.card.component";
import { useDataContext } from "../../context/DataContext";

const items = [
  {
    icon: <SettingsSuggestRoundedIcon />,
    title: "Adaptable performance",
    description:
      "Our product effortlessly adjusts to your needs, boosting efficiency and simplifying your tasks.",
  },
  {
    icon: <ConstructionRoundedIcon />,
    title: "Built to last",
    description:
      "Experience unmatched durability that goes above and beyond with lasting investment.",
  },
  {
    icon: <ThumbUpAltRoundedIcon />,
    title: "Great user experience",
    description:
      "Integrate our product into your routine with an intuitive and easy-to-use interface.",
  },
  {
    icon: <AutoFixHighRoundedIcon />,
    title: "Innovative functionality",
    description:
      "Stay ahead with features that set new standards, addressing your evolving needs better than the rest.",
  },
  {
    icon: <SupportAgentRoundedIcon />,
    title: "Reliable support",
    description:
      "Count on our responsive customer support, offering assistance that goes beyond the purchase.",
  },
  {
    icon: <QueryStatsRoundedIcon />,
    title: "Precision in every detail",
    description:
      "Enjoy a meticulously crafted product where small touches make a significant impact on your overall experience.",
  },
];

export default function Highlights() {
  const [topInsightSource, setTopInsightSource] = React.useState({});
  const [mostHotTopic, setMostHotTopic] = React.useState({});
  const [mostRelevantTopic, setMostRelevantTopic] = React.useState({});
  const { appData } = useDataContext();

  React.useEffect(() => {
    setTopInsightSource(determineTopInsightSource(appData));
    setMostHotTopic(calculateMostHotTopic(appData));
    setMostRelevantTopic(calculateMostRelevantTopic(appData));
    const topRegions = calculateTopRegions(appData);
  }, []);
  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 2, sm: 2 },
        pb: { xs: 2, sm: 2 },
        color: "#716E7A",
        bgcolor: "none",
      }}
    >
      <Container
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Grid container spacing={2.5}>
          <SmallCard
            icon={<FlashOnIcon className="FlashOnIcon" />}
            title={topInsightSource.topSource}
            subtitle={"Top Insight Source"}
            number={topInsightSource.count}
            additionalInfo={"Total Publishes"}
            className={"card-1"}
          />
          <SmallCard
            icon={<WhatshotIcon className="WhatshotIcon" />}
            title={mostHotTopic.mostHotTopic}
            subtitle={"Hottest Topic"}
            number={mostHotTopic.highestIntensity}
            additionalInfo={`The ${mostHotTopic.sector} will see the intensity of ${mostHotTopic.highestIntensity} making ${mostHotTopic.mostHotTopic} the hottest talk`}
            className={"card-2"}
          />
          <SmallCard
            icon={<AddModeratorIcon className="AddModeratorIcon" />}
            title={mostRelevantTopic.topic}
            subtitle={"The most relevant"}
            number={mostRelevantTopic.relevance}
            additionalInfo={`${mostRelevantTopic.topic} becomes relatively important for ${mostRelevantTopic.region} in the comming years`}
            className={"card-3"}
          />
        </Grid>
      </Container>
    </Box>
  );
}
