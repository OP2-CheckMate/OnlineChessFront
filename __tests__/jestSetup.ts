// jest runs this file before all tests
import MockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock'

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')
jest.mock('@react-native-async-storage/async-storage', () => MockAsyncStorage)