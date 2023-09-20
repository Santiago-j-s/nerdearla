import axios from "axios";
import App from "../App";

const getTalks = async () =>
  axios.post("https://api.swapcard.com/graphql", {
    operationName: "PlanningListViewConnectionQuery",
    variables: {
      eventId: "RXZlbnRfMTQ3MjE2MA==",
      withEvent: true,
      viewId: "RXZlbnRWaWV3XzYwMjEwNg==",
      timezone: "America/Buenos_Aires",
      after: null,
      first: 200,
    },
    extensions: {
      persistedQuery: {
        version: 1,
        sha256Hash:
          "451a05a3182a71b2515b9a3a22ef77641537ed87e2c07fe8af33f862e5cb6aea",
      },
    },
  });

const mapTalks = (talks) =>
  talks.data.view.plannings.nodes.map((t) => ({
    ...t,
    date: t.beginsAt.split("T")[0],
    beginsAt: t.beginsAt.substring(11, 16),
    endsAt: t.endsAt.substring(11, 16),
  }));

export default async function Page() {
  const talks = await getTalks();

  const mappedTalks = mapTalks(talks.data);

  const groupedTalks = mappedTalks.reduce((acc, curr) => {
    const dateKey = curr.date;

    acc[dateKey] = acc[dateKey] || {};

    (acc[dateKey][curr.place.split(" ")[0]] =
      acc[dateKey][curr.place.split(" ")[0]] || []).push(curr);

    return acc;
  }, {});

  return <App talks={groupedTalks} />;
}
