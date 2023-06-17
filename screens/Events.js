import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { getEvents } from "../services/eventServices";
import { EventCard } from "../components/eventCard";
import Footer from "./Footer";

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
    <>
      <FlatList
        style={styles.EventsList}
        contentContainerStyle={styles.EventListContainer}
        keyExtractor={(item) => item.id.toString()}
        data={events}
        renderItem={renderEvent}
      />
      <Footer />
    </>
  );
}

const styles = StyleSheet.create({
  EventsList: {
    backgroundColor: "#eeeeee",
  },
  EventListContainer: {
    backgroundColor: "#eeeeee",
    paddingVertical: 16,
    marginHorizontal: 16,
  },
});
