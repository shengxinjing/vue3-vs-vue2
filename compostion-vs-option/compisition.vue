<script>

import { useQuery, mutate } from 'vue-apollo'
import { nextTick, state, value, watch } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'

// Reusable functions not specific to this component
import { useNetworkState } from '@/functions/network'
import { usePathUtils } from '@/functions/path'
import { resetCwdOnLeave, useCwdUtils } from '@/functions/cwd'

// GraphQL
import FOLDER_CURRENT from '@/graphql/folder/folderCurrent.gql'
import FOLDERS_FAVORITE from '@/graphql/folder/favoriteFolders.gql'
import FOLDER_OPEN from '@/graphql/folder/folderOpen.gql'
import FOLDER_OPEN_PARENT from '@/graphql/folder/folderOpenParent.gql'
import FOLDER_SET_FAVORITE from '@/graphql/folder/folderSetFavorite.gql'
import PROJECT_CWD_RESET from '@/graphql/project/projectCwdReset.gql'
import FOLDER_CREATE from '@/graphql/folder/folderCreate.gql'

// Misc
import { isValidMultiName } from '@/util/folders'
const SHOW_HIDDEN = 'vue-ui.show-hidden-folders'



export default {
  setup () {
    // Network
    const { networkState } = useNetworkState()

    // Folder
    const { folders, currentFolderData } = useCurrentFolderData(networkState)
    const folderNavigation = useFolderNavigation({ networkState, currentFolderData })
    const { favoriteFolders, toggleFavorite } = useFavoriteFolders(currentFolderData)
    const { showHiddenFolders } = useHiddenFolders()
    const createFolder = useCreateFolder(folderNavigation.openFolder)

    // Current working directory
    resetCwdOnLeave()
    const { updateOnCwdChanged } = useCwdUtils()

    // Utils
    const { slicePath } = usePathUtils()

    return {
      networkState,
      folders,
      currentFolderData,
      folderNavigation,
      favoriteFolders,
      toggleFavorite,
      showHiddenFolders,
      createFolder,
      updateOnCwdChanged,
      slicePath
    }
  }
}

// Reusable functions specific to this component
function useCurrentFolderData (networkState) {
  const folders = ref(null)

  const currentFolderData = useQuery({
    query: FOLDER_CURRENT,
    fetchPolicy: 'networkState-only',
    networkState,
    async result () {
      await nextTick()
      folders.scrollTop = 0
    }
  }, {})
  return {
    folders,
    currentFolderData
  }
}

function useFolderNavigation ({ networkState, currentFolderData }) {
  // Path editing
  const pathEditing = state({
    editingPath: false,
    editedPath: '',
  })

  // DOM ref

</script>