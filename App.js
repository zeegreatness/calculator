import React from 'react';
import { StyleSheet } from "react-native";
import { Container, Header, Title, Content, Button, Icon, Text } from 'native-base';
import SwipeGesture from './swipe-gesture';

export default class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      equation : '',
      output: 0,
      loading: true
    }
  }

  // Wait for the fonts to load first
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
    });
    this.setState({ loading: false });
  }


  writeEquation = (val) => {
    const eq_val = this.state.equation.toString() + val.toString();

    this.setState({
      equation: eq_val,
      output: eq_val
    });
    
  }

  clearEquation = () => {
    this.setState({
      equation: '',
      output: 0
    })
  }

  performEquation = () =>{
    if(this.state.equation){
      try {
        const result = eval(this.state.equation);

        this.setState({
          output: result,
          equation: result
        })
      } catch (e) {
          if (e instanceof SyntaxError) {
              alert('Syntax Error');
          }
      }
    }
  }


  onSwipePerformed = (action) => {
    const equation = this.state.equation.toString();
    const output = this.state.output.toString();

      switch(action){
        case 'right':{
          this.setState({
            equation: equation.slice(0, -1),
            output: output.slice(0, -1)
          },() => {
            if(!this.state.equation){
              this.setState({
                equation: '',
                output: 0
              })
            }
          })
        }
         default : {
         console.log('Undected action')
         }
      }
  }

  render() {
    if (this.state.loading) {
      return <Expo.AppLoading />;
    }

    return (
      <Container>
        <Header>
          <Title>
            Greatest Calculator
          </Title>
        </Header>
        <Content style={{backgroundColor: 'black'}}>
            <SwipeGesture onSwipePerformed={this.onSwipePerformed}>
              <Text style={{textAlign: 'right', paddingTop: 100, fontSize: 80, color: 'white'}}>{this.state.output}</Text>
            </SwipeGesture>
      
            <Content contentContainerStyle={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
              <Button style={defStyle.btnLower} light onPress={this.clearEquation}><Text>AC</Text></Button>
              <Button style={defStyle.btnLower} light onPress={() => this.writeEquation('(')}><Text>(</Text></Button>
              <Button style={defStyle.btnLower} light onPress={() => this.writeEquation(')')}><Text>)</Text></Button>
            </Content>

            <Content contentContainerStyle={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
              <Button style={defStyle.btn} large warning onPress={() => this.writeEquation(7)}><Text>7</Text></Button>

              <Button style={defStyle.btn} large warning onPress={() => this.writeEquation(8)}><Text>8</Text></Button>

              <Button style={defStyle.btn} large warning onPress={() => this.writeEquation(9)}><Text>9</Text></Button>
            </Content>

            <Content contentContainerStyle={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
              <Button style={defStyle.btn} large warning onPress={() => this.writeEquation(4)}><Text>4</Text></Button>

              <Button style={defStyle.btn} large warning onPress={() => this.writeEquation(5)}><Text>5</Text></Button>

              <Button style={defStyle.btn} large warning onPress={() => this.writeEquation(6)}><Text>6</Text></Button>
            </Content>

            <Content contentContainerStyle={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
              <Button style={defStyle.btn} large warning onPress={() => this.writeEquation(1)}><Text>1</Text></Button>

              <Button style={defStyle.btn} large warning onPress={() => this.writeEquation(2)}><Text>2</Text></Button>

              <Button style={defStyle.btn} large warning onPress={() => this.writeEquation(3)}><Text>3</Text></Button>
            </Content>

            <Content contentContainerStyle={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
              <Button style={defStyle.btnUpper} large warning onPress={() => this.writeEquation('+')}><Icon name='add' /></Button>

              <Button style={defStyle.btnUpper} large warning onPress={() => this.writeEquation('*')}><Icon name='close' /></Button>

              <Button style={defStyle.btnUpper} large warning onPress={() => this.writeEquation('/')}><Text>/</Text></Button>

              <Button style={defStyle.btnUpper} large warning onPress={() => this.writeEquation('-')}><Icon name='remove' /></Button>
            </Content>

            <Content contentContainerStyle={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
              <Button style={defStyle.btnLower} large warning onPress={() => this.writeEquation('0')}><Text>0</Text></Button>

              <Button style={defStyle.btnLower} large warning onPress={() => this.writeEquation('.')}><Text>.</Text></Button>

              <Button style={defStyle.btnLower} large warning onPress={() => this.performEquation(1)}><Text>=</Text></Button>
            </Content>
        </Content>
      </Container>
    );
  }
}

const defStyle = StyleSheet.create({
  btnUpper: {
    padding: 30,
    alignSelf: null,
    borderRadius: 0
  },
  btn: {
    padding: 50,
    alignSelf: null,
    borderRadius: 0
  },
  btnLower: {
    padding: 50,
    alignSelf: null,
    borderRadius: 0
  }
})