import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { getEvents } from "../services/eventServices";
import { EventCard } from "../components/eventCard";

export default function Events({ navigation }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await getEvents();
        setEvents(eventsData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvents();
  }, []);

  function renderEvent({ item: event }) {
    console.log(event);
    return (
      <EventCard
        {...event}
        onPress={() => {
          navigation.navigate("Events", { courseID: event.id });
        }}
      />
    );
  }

  return (
    <FlatList
      style={styles.coursesList}
      contentContainerStyle={styles.coursesListContainer}
      keyExtractor={(item) => item.id.toString()}
      data={events}
      renderItem={renderEvent}
    />
  );
}

const styles = StyleSheet.create({
  EventsList: {
    backgroundColor: "#eeeeee",
  },
  EventListContainer: {
    backgroundColor: "#eeeeee",
    paddingVertical: 8,
    marginHorizontal: 8,
  },
});
