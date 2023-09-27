import { View, Text, StyleSheet, Keyboard, Image } from 'react-native'
import {
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native-gesture-handler'
// import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons'
import { COLORS } from '../libs/colors'
import React, { useState, useEffect, useRef } from 'react'
import { Camera } from 'expo-camera'
import * as MediaLibrary from 'expo-media-library'
import { TakePhoto } from '../Components/TakePhoto'
import { PreviewPhoto } from '../Components/PreviewPhoto'

export const CreatePostsScreen = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null)
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] =
    useState(null)
  const [photo, setPhoto] = useState(null)

  const [isPublishBtnDisabled, setIsPublishBtnDisabled] = useState(true)

  useEffect(() => {
    ;(async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync()
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync()

      setHasCameraPermission(cameraPermission.status === 'granted')
      setHasMediaLibraryPermission(mediaLibraryPermission.status === 'granted')
    })()
  }, [])

  if (hasCameraPermission === null) {
    return (
      <View style={styles.cameraErrorWrapper}>
        <Text style={styles.cameraError}>Requesting permission...</Text>
      </View>
    )
  } else if (!hasCameraPermission) {
    return (
      <View style={styles.cameraErrorWrapper}>
        <Text style={styles.cameraError}>
          Oops... Permission for the camera is not granted. Please change this
          in the settings.
        </Text>
      </View>
    )
  }

  const onChange = () => {
    // console.log(e.currentTurget.value)
    return
  }

  const onSubmit = () => {
    return
  }

  const updateData = (value) => {
    setPhoto(value)
  }
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.addPhotoSection}>
          <View style={styles.cameraWrapper}>
            {photo ? (
              <PreviewPhoto
                source={{ uri: 'data:image/jpg;base64,' + photo.base64 }}
              />
            ) : (
              <TakePhoto updateData={updateData} />
            )}
          </View>
          <TouchableOpacity
            style={styles.addPhotoLink}
            disabled={photo ? false : true}
            onPress={() => {
              setPhoto(null)
            }}
          >
            <Text style={styles.addPhotoText}>
              {photo ? 'Редагувати фото' : 'Завантажте фото'}
            </Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={[styles.inputCommon, styles.inputName]}
          placeholder="Назва..."
          placeholderTextColor={COLORS.placeholderColor}
          name="name"
          onChangeText={onChange}
        />

        <TextInput
          style={[styles.inputCommon, styles.inputLocation]}
          placeholder="Місцевість..."
          placeholderTextColor={COLORS.placeholderColor}
          name="location"
          onChangeText={onChange}
        />
      </TouchableWithoutFeedback>
      <TouchableOpacity
        style={{
          ...styles.publishBtn,
          backgroundColor: isPublishBtnDisabled
            ? COLORS.primaryBtnDisabled
            : COLORS.primaryBtnActive
        }}
        onPress={onSubmit}
        disabled={isPublishBtnDisabled}
      >
        <Text
          style={{
            ...styles.publishBtnText,
            color: isPublishBtnDisabled
              ? COLORS.whiteBtnTextDisabled
              : COLORS.whiteBtnText
          }}
        >
          Опубліковати
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack()
        }}
      ></TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: 'white'
  },
  addPhotoSection: {
    width: '100%',
    marginTop: 32
  },
  cameraWrapper: {
    width: '100%',
    height: 240,
    borderRadius: 8,
    overflow: 'hidden'
  },

  addPhotoText: {
    color: COLORS.grayText,
    fontSize: 16
  },
  addPhotoLink: {
    marginTop: 8
  },
  inputCommon: {
    width: '100%',
    paddingTop: 16,
    paddingBottom: 15,

    color: COLORS.regularText,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,

    borderBottomWidth: 1,
    borderColor: COLORS.inputBorder
  },
  inputName: {
    marginTop: 32
  },
  inputLocation: {
    marginTop: 16
  },
  publishBtn: {
    width: '100%',
    padding: 16,
    borderRadius: 100,
    alignItems: 'center',
    marginTop: 32
  },
  publishBtnText: {
    color: COLORS.whiteBtnText,
    fontFamily: 'Roboto-Medium',
    fontSize: 16
  },
  cameraErrorWrapper: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 20,

    marginTop: 50,
    width: 250,
    alignSelf: 'center'
  },
  cameraError: {
    color: COLORS.regularText,
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    textAlign: 'center'
  }
})
