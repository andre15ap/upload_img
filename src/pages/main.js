import React, { Component } from 'react';
import {View, Text, TouchableOpacity, Image, ToastAndroid} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import api from '../services/api'

  
//   // Open Image Library:
//   ImagePicker.launchImageLibrary(options, (response) => {
//     // Same code as in above section!
//   });

export default class Main extends Component {
    constructor (props) {
        super(props);
        this.state = {
            imagem: null,
            file: '',
            data: null
        }
      };

    carregarCamera = () =>{
        const options = {
            title: 'Selecione',
            takePhotoButtonTitle: 'Tirar Foto', 
            chooseFromLibraryButtonTitle: 'Escolher do Celular',
            cancelButtonTitle: 'Cancelar',
            //customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
          };
          
          /**
           * The first arg is the options object for customization (it can also be null or omitted for default options),
           * The second arg is the callback which sends object: response (more info in the API Reference)
           */
          ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
          
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              
              // You can also display the image using data:
              const source = { uri: 'data:image/jpeg;base64,' + response.data };
          
              this.setState({
                imagem: source,
                file: response,
                data: response.data
              });
            }
          });
    }


    uploadPhoto ()  {
      const token = 'a66b410e0e9b971a2b33a0fe7fac28c040d2f5db';
      //var file = 'data:image/png;base64,' + this.state.data;
      
      RNFetchBlob.fetch('POST', 'http://192.168.43.177:8000/api/carregar_arquivo/', {
        Authorization : "token "+token,
        otherHeader : "foo",
        'Content-Type' : 'multipart/form-data',
      }, [
        
        // custom content type
        { name : 'image', filename : this.state.file.fileName, type: this.state.file.type, data: this.state.data},
        
      ]).then((resp) => {
        const {ok} = JSON.parse(resp.data);
        console.log(ok);
        if (ok == 'true'){
          this.mensagem('Imagem Salva com Sucesso!');
        }else{
          this.mensagem('Erro ao Salvar a Imagem');
        }
      }).catch((err) => {
        console.log('Erro '+err);
        this.mensagem('Erro Interno');
      })

    }

    mensagem(msg){
      ToastAndroid.showWithGravity(
        msg,
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    }
   

    
    render() {
        return (
            <View>
                <Text>Olá Mundo</Text>
                <TouchableOpacity
                style={{width: 150, height: 50, backgroundColor: 'orange'}}
                    onPress={() => {
                        this.carregarCamera()
                        }}>
                    <Text>Camera</Text>
                </TouchableOpacity>
                {
                  this.state.imagem 
                  &&
                  <Image style={{width: 100, height: 100}} source={this.state.imagem} />
                }
                

                <TouchableOpacity
                style={{width: 150, height: 50, backgroundColor: 'green'}}
                    onPress={() => {
                        this.uploadPhoto()
                        }}>
                    <Text>Salvar</Text>
                </TouchableOpacity>
            </View>
        )
    }
}