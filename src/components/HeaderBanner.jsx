import { Box, Image, Link } from "@chakra-ui/react";

export const HeaderBanner = ({ url }) => (
  <Link href={url} target="_blank" isExternal>
    <Box bg="black" color="white" textAlign="center" py={8}>
      <Image
        src="/nerdearla-banner.svg"
        alt="Nerdearla Banner"
        maxW="100%"
        maxHeight="100px"
        mx="auto"
      />
    </Box>
  </Link>
);
