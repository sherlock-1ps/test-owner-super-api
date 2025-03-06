import { getAssistantData } from '@/app/server/pages/assistant/assistantAction'
import AssistantComponent from '@/views/bops/assistant/AssistantComponent'

const AssistantBops = async () => {
  const AssistantList = await getAssistantData()

  return <AssistantComponent data={AssistantList?.data?.list || []} />
}

export default AssistantBops
