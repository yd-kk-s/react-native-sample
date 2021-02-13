import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { ButtonGroup, ListItem, Icon } from 'react-native-elements';
import { Api } from '../../../Api';

import { Review } from '../../domains/Review';

function HomeScreen({ navigation }: {navigation: any}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [reviews, setReviews] = useState([]);
  const buttonList = [
    'All',
    'Great (0)',
    'Good (0)',
    'Poor (0)',
  ];

  enum ReviewRank {
    All,
    Great,
    Good,
    Poor
  }

  // db.josnからデータを取得する
    useEffect (() => {
      (async () => {
        try {
          const result = await Api.get('reviews');
          const reviews = result.data;
          setReviews(reviews);
        } catch (error) {
          console.log("error!!");
        }
      })();
    }, [])

  const onButtonGroupPress = (selectedIndex: number) => {
    setSelectedIndex(selectedIndex)
  }

  const renderReviews = () => {
    let rankedReviews: Review[] = [];

    if (selectedIndex === ReviewRank.All) {
      rankedReviews = reviews;
    } else {
      for (var i = 0; i < reviews.length; i++) {
        if (reviews[i]["rank"] === selectedIndex) {
          rankedReviews.push(reviews[i]);
        }
      }
    }
    // console.log(rankedReviews)

    return (
      <ScrollView>
        {rankedReviews.map((review, index) => {
            return (
              <ListItem key={index} bottomDivider>
              <Icon name={(() => {
                  switch(review.rank) {
                    case ReviewRank.Great: return 'sentiment-very-satisfied';
                    case ReviewRank.Good: return 'sentiment-satisfied';
                    case ReviewRank.Poor: return 'sentiment-dissatisfied'
                    default: return ''
                  }
                })()}
                color={(() => {
                  switch(review.rank) {
                    case ReviewRank.Great: return 'red';
                    case ReviewRank.Good: return 'orange';
                    case ReviewRank.Poor: return 'blue'
                    default: return ''
                  }
                })()}
              />
              <ListItem.Content>
                <ListItem.Title>{review.country}</ListItem.Title>
                <ListItem.Subtitle>{review.dateFrom}~{review.dateTo}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
            );
          })
        }
      </ScrollView>
    )
  }
  
  return(
    <View style={{ flex: 1 }}>
      <ButtonGroup
        buttons={buttonList}
        selectedIndex={selectedIndex}
        onPress={onButtonGroupPress}
    />
    {renderReviews()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;