import React , { useState } from 'react';
import { View , Text , StyleSheet , TouchableOpacity} from 'react-native';

const Calculator = () => {

    const [value,setValue] = useState('0');
    const [memory,setMemory] = useState(null);
    const [operator,setOperator] = useState(null);    

    const handleTopButtons = (v) => {
        const num = parseFloat(value);
        switch(v){
            case 'AC' :
                setValue('0');
                setMemory(null);
                setOperator(null);
                break
            case '+/-' :
                setValue((num * -1).toString());
                break;
            case '%' :
                setValue((num/100).toString());
                setMemory(null);
                setOperator(null);
                break;
        }
    }

    const allNumbers = () => {
        let rows = [];
        let nums = [[7,8,9],[4,5,6],[1,2,3]];
        for(let i = 0 ; i<3 ; i++) {
            let row = [];
            for(let j = 0 ; j<3 ; j++) {
                row.push(
                <TouchableOpacity key={j} style={styles.touch} onPress={() => pressNumber(nums[i][j]) }>
                    <Text style={styles.text}> {nums[i][j]} </Text>
                </TouchableOpacity>
                )
            }
            rows.push(
            <View key={i} style={styles.row}>
                {row}
            </View>)
        }
        return rows
    }

    const topButtons = () => {
        let characters = ['AC','+/-','%'];
        let array = [];
        for(let i = 0 ; i<characters.length ; i++) {
            array.push(
                <TouchableOpacity key={i} style={styles.topButton} onPress={() => handleTopButtons(characters[i])}>
                    <Text style={styles.topText}>{characters[i]}</Text>
                </TouchableOpacity>
            )
        }
        return array;
    }

    const pressNumber = (v) => {
        if(v === '.') {
            if(value.includes('.')) return;
            setValue(value+'.');
            return;            
        }
        if (value[value.length - 1] === ".") {
            setValue(value + v);
        }else {
            setValue(parseFloat(value + v).toString());
        }
    }

    const pressActions = (v) => {
        
        if(operator !== null) {
            if (operator === "+") {
            setMemory(memory + parseFloat(value));
            } else if (operator === "−") {
            setMemory(memory - parseFloat(value));
            } else if (operator === "*") {
            setMemory(memory * parseFloat(value));
            } else if (operator === "/") {
            setMemory(memory / parseFloat(value));
            }
        } else {
            setMemory(parseFloat(value));
        }

        switch(v) {
            case '+':
                setValue('0');
                setOperator('+');
                break;
            case '-' :                
                setValue("0");
                setOperator("−");
                break;
            case '*' :                
                setValue("0");
                setOperator("*");
                break;
            case '/' :                
                setValue('0');
                setOperator('/');
                break;
            case '=' :
                if(!operator) return;
                if (operator === "+") {
                    setValue((memory + parseFloat(value)).toString());
                } else if (operator === "−") {
                    setValue((memory - parseFloat(value)).toString());
                } else if (operator === "*") {
                    setValue((memory * parseFloat(value)).toString());
                } else if (operator === "/") {
                    setValue((memory / parseFloat(value)).toString());
                }
                setMemory(null);
                setOperator(null);
                break;
        }
    } 
    
    const buttonActions = () => {
        let array = [];
        const operations = ['/','*','-','+','='];
        for(let i = 0 ; i<operations.length ; i++) {
            array.push(
            <TouchableOpacity
            onPress={() => pressActions(operations[i])}
            key={i}
            style={styles.rightButton}
            >
                <Text style={styles.text}> {operations[i] === '/' ? '÷' : operations[i] === '*' ? '×' : operations[i]} </Text>
            </TouchableOpacity>
            )
        }
        return array;
    }

    return (
        <View style={styles.container} >
            <View style={styles.result}></View>
            <View style={styles.operation}>
                <Text style={styles.calculationResult}>{value}</Text>
            </View>
            <View style={styles.button}>
                <View style={styles.numbers}>
                    <View style={styles.row}>                        
                        {topButtons()}
                    </View>
                    {allNumbers()}
                    <View style={styles.row}>
                        <TouchableOpacity style={styles.zero} onPress={() => pressNumber(0)}>
                            <Text style={[styles.text,{paddingLeft:20}]}> 0 </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touch} onPress={() => pressNumber('.')}>
                            <Text style={styles.text}> . </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.action}>
                    {buttonActions()}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    result:{
        flex:2,
        backgroundColor:'black'
    },
    row:{
        flexDirection:'row',
        flex:1,
        justifyContent:'space-around',
        alignItems:'center',
    },
    operation:{
        flex:1.5,
        backgroundColor:'black',
        alignItems:'flex-end',
        justifyContent:'center'
    },
    button:{
        flex:7,
        flexDirection:'row'
    },
    numbers:{
        flex:3,
        backgroundColor:'black'
    },
    action:{
        flex:1,
        justifyContent:'space-around',
        alignItems:'center',
        backgroundColor:'black'
    },
    touch:{
        borderRadius:50,
        backgroundColor:'#333333',
        width:75,
        height:75,
        justifyContent:'center',
        alignItems:'center',
    },
    text:{
        color:'white',
        fontSize:35
    },
    topButton:{
        borderRadius:50,
        backgroundColor:'#a6a5a4',
        width:75,
        height:75,        
        justifyContent:'center',
        alignItems:'center',
    },
    topText:{
        color:'black',
        fontSize:35
    },
    rightButton:{
        borderRadius:50,
        backgroundColor:'#fc9305',
        width:75,
        height:75,        
        justifyContent:'center',
        alignItems:'center',
    },
    zero:{
        borderRadius:50,
        backgroundColor:'#333333',
        width:180,
        height:75,
        justifyContent:'center',
    },
    calculationResult:{
        color:'white',
        fontSize:100,
        paddingRight:25
    }
});

export default Calculator;