import { Check, Edit2, MessageSquare, Plus, Send, Trash2, X } from 'lucide-react'
import { useState } from 'react'

const EditableOption = ({ option, index, onEdit, onDelete }: any) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedOption, setEditedOption] = useState(option)

  const handleSave = () => {
    onEdit(index, editedOption)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedOption(option)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg p-4 shadow-md transition-all duration-300 space-y-2">
        <input
          type="text"
          value={editedOption.emoji}
          onChange={(e) => setEditedOption({ ...editedOption, emoji: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="Emoji"
        />
        <input
          type="text"
          value={editedOption.title}
          onChange={(e) => setEditedOption({ ...editedOption, title: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="Title"
        />
        <input
          type="text"
          value={editedOption.subtext}
          onChange={(e) => setEditedOption({ ...editedOption, subtext: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="Subtext"
        />
        <div className="flex justify-end space-x-2">
          <button onClick={handleSave} className="p-2 bg-green-500 text-white rounded hover:bg-green-600">
            <Check size={18} />
          </button>
          <button onClick={handleCancel} className="p-2 bg-red-500 text-white rounded hover:bg-red-600">
            <X size={18} />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg p-4 shadow-md transition-all duration-300 flex items-start space-x-4">
      <div className="text-4xl">{option.emoji}</div>
      <div className="flex-grow">
        <h3 className="text-lg font-semibold mb-1">{option.title}</h3>
        <p className="text-sm text-gray-600">{option.subtext}</p>
      </div>
      <div className="flex space-x-2">
        <button onClick={() => setIsEditing(true)} className="p-2 text-blue-500 hover:bg-blue-100 rounded">
          <Edit2 size={18} />
        </button>
        <button onClick={() => onDelete(index)} className="p-2 text-red-500 hover:bg-red-100 rounded">
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  )
}

const EditableAISurveyCreator = () => {
  const [question, setQuestion] = useState('')
  const [generatedOptions, setGeneratedOptions] = useState([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationStep, setGenerationStep] = useState(0)

  const simulateAIGeneration = () => {
    setIsGenerating(true)
    setGeneratedOptions([])
    setGenerationStep(0)

    const options = [
      { emoji: '🚀', title: 'Innovative Solutions', subtext: 'Cutting-edge approaches to problem-solving' },
      { emoji: '💡', title: 'Creative Thinking', subtext: 'Unique and original ideas for success' },
      { emoji: '🌟', title: 'Excellence in Execution', subtext: 'Flawless implementation of strategies' },
      { emoji: '🔮', title: 'Future-Focused Vision', subtext: 'Anticipating and shaping industry trends' }
    ]

    options.forEach((option, index) => {
      setTimeout(
        () => {
          setGeneratedOptions((prev) => [...prev, option])
          setGenerationStep(index + 1)
          if (index === options.length - 1) {
            setIsGenerating(false)
          }
        },
        (index + 1) * 1500
      )
    })
  }

  const handleEdit = (index, updatedOption) => {
    const updatedOptions = [...generatedOptions]
    updatedOptions[index] = updatedOption
    setGeneratedOptions(updatedOptions)
  }

  const handleDelete = (index) => {
    const updatedOptions = generatedOptions.filter((_, i) => i !== index)
    setGeneratedOptions(updatedOptions)
  }

  const handleAddOption = () => {
    setGeneratedOptions([
      ...generatedOptions,
      { emoji: '➕', title: 'New Option', subtext: 'Add details for this option' }
    ])
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 min-h-screen rounded-lg">
      <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
        AI-Powered Survey Creator
      </h1>

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="mb-6">
          <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
            Survey Question
          </label>
          <div className="flex items-center bg-gray-100 rounded-lg p-2">
            <MessageSquare size={24} className="text-gray-400 ml-3 mr-2" />
            <input
              id="question"
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter your survey question..."
              className="flex-grow bg-transparent border-none focus:outline-none px-4 py-3 text-lg"
            />
          </div>
        </div>

        <button
          onClick={simulateAIGeneration}
          disabled={isGenerating || !question}
          className={`w-full py-3 rounded-lg text-white font-semibold transition-all duration-300 ${
            isGenerating || !question
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600'
          }`}
        >
          {isGenerating ? 'Generating Options...' : 'Generate AI Options'}
          {!isGenerating && <Send size={18} className="ml-2 inline" />}
        </button>

        {isGenerating && (
          <div className="flex flex-col items-center mt-8">
            <div className="w-16 h-16 border-t-4 border-indigo-500 border-solid rounded-full animate-spin"></div>
            <p className="mt-4 text-lg font-medium text-indigo-600">AI is crafting your options...</p>
            <div className="mt-2 text-sm text-gray-500">Generated {generationStep} out of 4 options</div>
          </div>
        )}

        {question && generatedOptions.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 text-indigo-700">Survey Preview</h2>
            <div className="bg-indigo-50 rounded-lg p-4 mb-6">
              <p className="text-lg font-medium text-indigo-800">{question}</p>
            </div>
            <div className="space-y-4">
              {generatedOptions.map((option, index) => (
                <EditableOption key={index} option={option} index={index} onEdit={handleEdit} onDelete={handleDelete} />
              ))}
            </div>
          </div>
        )}

        {generatedOptions.length > 0 && !isGenerating && (
          <button
            onClick={handleAddOption}
            className="mt-4 flex items-center justify-center w-full py-3 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 font-semibold transition-colors"
          >
            <Plus size={18} className="mr-2" /> Add Custom Option
          </button>
        )}
      </div>

      {generatedOptions.length > 0 && !isGenerating && (
        <div className="text-center">
          <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
            Create Survey
          </button>
        </div>
      )}
    </div>
  )
}

export default EditableAISurveyCreator
