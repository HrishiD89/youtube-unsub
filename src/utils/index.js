import axios from "axios";

const fetchChannelInfo = async (channelIds, accessToken) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelIds.join(
        ","
      )}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      }
    );

    return response.data.items; // Returns an array of channel details
  } catch (error) {
    console.error(
      "Error fetching channel details:",
      error?.response?.data || error.message
    );
    throw error;
  }
};

const fetchSubscriptionList = async (accessToken) => {
  let allSubscriptions = [];
  let nextPageToken = "";

  try {
    do {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&mine=true&maxResults=50${
          nextPageToken ? `&pageToken=${nextPageToken}` : ""
        }`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
          },
        }
      );

      const data = response.data;
      allSubscriptions = allSubscriptions.concat(data.items);
      nextPageToken = data.nextPageToken || ""; // Avoid undefined errors
    } while (nextPageToken);

    return allSubscriptions;
  } catch (error) {
    console.error(
      "Error fetching subscriptions:",
      error?.response?.data || error.message
    );
    throw error;
  }
};

export const fetchAllSubscription = async (accessToken) => {
  const subscriptions = await fetchSubscriptionList(accessToken);
  const channelIds = subscriptions.map(
    (sub) => sub.snippet.resourceId.channelId
  );

  const chunkSize = 50;
  let detailedSubscriptions = [];

  // Create batches of channelIds
  for (let i = 0; i < channelIds.length; i += chunkSize) {
    const batchIds = channelIds.slice(i, i + chunkSize);
    try {
      const channelDetails = await fetchChannelInfo(batchIds, accessToken);

      // Create a map of channel details by channel ID for easy lookup
      const channelDetailsMap = channelDetails.reduce((map, channel) => {
        map[channel.id] = channel;
        return map;
      }, {});

      // Match subscriptions with their corresponding channel details
      const batchSubscriptions = subscriptions
        .slice(i, i + chunkSize)
        .map((sub) => {
          const channelId = sub.snippet.resourceId.channelId;
          return {
            ...sub,
            details: channelDetailsMap[channelId] || null,
          };
        });

      detailedSubscriptions = detailedSubscriptions.concat(batchSubscriptions);
    } catch (error) {
      console.error(
        `Error fetching batch of channel details (${i}-${i + chunkSize}):`,
        error?.response?.data || error.message
      );
    }
  }

  return Array.isArray(detailedSubscriptions) ? detailedSubscriptions : [];
};

export const UnsuscribeChannels = async (channelIds, accessToken) => {
  try {
    const unsubscribePromises = channelIds.map(async (channelId) => {
      try {
        const response = await axios.delete(
          `https://www.googleapis.com/youtube/v3/subscriptions?id=${channelId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              Accept: "application/json",
            },
          }
        );
        console.log(`Unsubscribed from channel ${channelId}:`, response.status);
        return response;
      } catch (error) {
        console.error(
          `Error unsubscribing from channel ${channelId}:`,
          error?.response?.data || error.message
        );
        throw error;
      }
    });

    const results = await Promise.all(unsubscribePromises);
    console.log("Unsubscribe process complete.", results);
    return results;
  } catch (overallError) {
    console.error("Overall error during unsubscribe process:", overallError);
    throw overallError;
  }
};

export const formatSubscriberCount = (subscriberCount) => {
  const count = parseInt(subscriberCount, 10);

  if (isNaN(count)) {
    return "Unknown subscribers";
  }

  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M `;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K `;
  } else {
    return `${count} `;
  }
};

