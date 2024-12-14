import { Box, Skeleton } from "@mui/material";

export function LoadingSkeleton() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 2,
      }}
    >
      {[1, 2, 3].map((item) => (
        <Box key={item} sx={{ width: "100%" }}>
          <Skeleton variant="rectangular" height={200} />
          <Box sx={{ pt: 1 }}>
            <Skeleton variant="text" sx={{ fontSize: "1.25rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          </Box>
        </Box>
      ))}
    </Box>
  );
}
