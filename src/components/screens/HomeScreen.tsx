import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { ButtonGroup, ListItem, Icon } from 'react-native-elements';
import { Api } from '../../../Api';

import { Review } from '../../domains/Review';

function HomeScreen({ navigation }: {navigation: any}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [nGreat, setNGreat] = useState(0);
  const [nGood, setNGood] = useState(0);
  const [nPoor, setNPoor] = useState(0);

  const buttonList = [
    `All (${reviews.length})`,
    `Great (${nGreat})`,
    `Good (${nGood})`,
    `Poor (${nPoor})`,
  ];

  enum ReviewRank {
    All,
    Great,
    Good,
    Poor
  }

  const renderReviewCount = (reviews: Review[]) => {
    let nGreat = 0;
    let nGood = 0;
    let nPoor = 0;

    for (var i = 0; i < reviews.length; i++) {
      switch(reviews[i].rank) {
        case ReviewRank.Great: nGreat++;break;
        case ReviewRank.Good: nGood++;break;
        case ReviewRank.Poor: nPoor++;break;
        default: return ''
      }
    }
    setNGreat(nGreat)
    setNGood(nGood)
    setNPoor(nPoor)
  }

  // db.josnからデータを取得する
    useEffect (() => {
      (async () => {
        try {
          const result = await Api.get('reviews');
          const reviews = result.data;
          setReviews(reviews);
          renderReviewCount(reviews)
        } catch (error) {
          console.log("error!!");
        }
      })();
    }, [])

  const onButtonGroupPress = (selectedIndex: number) => {
    setSelectedIndex(selectedIndex)
  }

  const onListItemPress = (selectedReview: Review) => {
    navigation.navigate('Detail', { selectedReview })
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
        {rankedReviews.map((review, index) => (
          <ListItem
            key={index}
            bottomDivider
            onPress={() => onListItemPress(review)}
          >
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
        ))}
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