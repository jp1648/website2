import { useTheme } from "@emotion/react";
import { Card, CardMedia, Typography, Link } from "@mui/material";

const CustomComponent = ({
  //   imageUrl,
  title,
  description,
  linkUrl,
  isRight = false,
}) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        bgcolor: theme.palette.primary.main,
        p: 2,
        width: "80%",
        textAlign: "center",
        borderRadius: "10px",
        marginLeft: isRight ? "auto" : -1,
        marginRight: isRight ? -1 : "auto",
      }}
    >
      {/* <CardMedia component="img" image={imageUrl + ".png"} alt={imageUrl} /> */}
      <Typography variant="h5">{title}</Typography>
      <Typography variant="body1">{description}</Typography>
      <Link href={linkUrl} target="_blank">
        Visit Link
      </Link>
    </Card>
  );
};

export default CustomComponent;
