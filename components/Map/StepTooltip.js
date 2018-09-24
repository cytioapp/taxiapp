import React from 'react';
import { View,  TouchableOpacity } from 'react-native';

import { Button, Text } from 'native-base';

const styles = {
  tooltipContainer: {
    paddingHorizontal: 5
  },
  bottomBar: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingVertical: 10,
    flexDirection: 'row'
  },
  buttonText: {
    color: '#E3C463',
    fontFamily: 'Nunito-Bold',
    marginHorizontal: 5
  }
}

const Tooltip = ({
  isFirstStep,
  isLastStep,
  handleNext,
  handlePrev,
  handleStop,
  currentStep
}) => (
  <View>
    <View style={styles.tooltipContainer}>
      <Text testID="stepDescription" style={styles.tooltipText}>{currentStep.text}</Text>
    </View>
    <View style={[styles.bottomBar]}>
      {
        (isFirstStep && !isLastStep) ?
          <TouchableOpacity onPress={handleNext}>
              <Text style={styles.buttonText}> Siguiente </Text>
          </TouchableOpacity>
          : null
      }
      {
        (!isFirstStep && !isLastStep) ?
        <React.Fragment>
          <TouchableOpacity onPress={handlePrev}>
            <Text style={styles.buttonText}> Anterior </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleNext}>
            <Text style={styles.buttonText}> Siguiente </Text>
          </TouchableOpacity>
        </React.Fragment> 
          : null
      }
      {
        isLastStep ?
          <React.Fragment>
            <TouchableOpacity onPress={handlePrev}>
              <Text style={styles.buttonText}> Anterior </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleStop}>
              <Text style={styles.buttonText}> Finalizar </Text>
            </TouchableOpacity>
          </React.Fragment> 
          : null
          
      }
    </View>
  </View>
);

export default Tooltip;