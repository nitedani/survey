import React, { useState, useRef, useEffect } from 'react'
import { Send, Edit2, Trash2, Plus, MessageSquare, Check, X, ArrowLeft, ArrowRight, Close } from 'lucide-react'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

// EditableOption component for individual survey options with emoji and text suggestions
const EditableOption = ({ option, index, onEdit, onDelete, showSuggestions }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedOption, setEditedOption] = useState(option)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [textSuggestions, setTextSuggestions] = useState([])
  const emojiInputRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiInputRef.current && !emojiInputRef.current.contains(event.target)) {
        setShowEmojiPicker(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [emojiInputRef])

  const handleSave = () => {
    onEdit(index, editedOption)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedOption(option)
    setIsEditing(false)
  }

  const handleEmojiSelect = (emoji) => {
    setEditedOption({ ...editedOption, emoji: emoji.native })
    setShowEmojiPicker(false)
  }

  const handleTextChange = (e) => {
    const value = e.target.value
    setEditedOption({ ...editedOption, title: value })

    if (showSuggestions && value?.length > 1) {
      const suggestions = [
        'Innovative Solutions',
        'Creative Thinking',
        'Excellence in Execution',
        'Future-Focused Vision'
      ]
      setTextSuggestions(suggestions.filter((s) => s.toLowerCase().includes(value.toLowerCase())))
    } else {
      setTextSuggestions([])
    }
  }

  return isEditing ? (
    <div className="bg-white rounded-lg p-4 shadow-md transition-all duration-300 space-y-2">
      <div ref={emojiInputRef} className="relative">
        <input
          type="text"
          value={editedOption.emoji}
          onChange={(e) => setEditedOption({ ...editedOption, emoji: e.target.value })}
          onFocus={() => setShowEmojiPicker(true)}
          className="w-full p-2 border rounded"
          placeholder="Emoji"
        />
        {showEmojiPicker && (
          <div className="absolute z-10">
            <Picker data={data} onEmojiSelect={handleEmojiSelect} />
          </div>
        )}
      </div>
      <input
        type="text"
        value={editedOption.title}
        onChange={handleTextChange}
        className="w-full p-2 border rounded"
        placeholder="Title"
      />
      {textSuggestions?.length > 0 && (
        <ul className="bg-white border rounded shadow-md">
          {textSuggestions.map((suggestion, i) => (
            <li
              key={i}
              className="p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => setEditedOption({ ...editedOption, title: suggestion })}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
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
  ) : (
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

// Main component for creating and managing multiple survey pages with past generations
const EditableAISurveyCreator = () => {
  const [pages, setPages] = useState([{ question: '', generations: [], currentGeneration: 0 }])
  const [currentPage, setCurrentPage] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationStep, setGenerationStep] = useState(0)
  const [surveyLinks, setSurveyLinks] = useState([])

  const simulateAIGeneration = () => {
    setIsGenerating(true)
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
          setPages((prevPages) => {
            const updatedPages = [...prevPages]
            const currentGen = updatedPages[currentPage].currentGeneration
            updatedPages[currentPage].generations[currentGen].push(option)
            return updatedPages
          })
          setGenerationStep(index + 1)
          if (index === options?.length - 1) {
            setIsGenerating(false)
          }
        },
        (index + 1) * 1500
      )
    })
  }

  const handleEdit = (index, updatedOption) => {
    const updatedPages = [...pages]
    const currentGen = updatedPages[currentPage].currentGeneration
    updatedPages[currentPage].generations[currentGen][index] = updatedOption
    setPages(updatedPages)
  }

  const handleDelete = (index) => {
    const updatedPages = [...pages]
    const currentGen = updatedPages[currentPage].currentGeneration
    updatedPages[currentPage].generations[currentGen] = updatedPages[currentPage].generations[currentGen].filter(
      (_, i) => i !== index
    )
    setPages(updatedPages)
  }

  const handleAddOption = () => {
    const updatedPages = [...pages]
    const currentGen = updatedPages[currentPage].currentGeneration
    updatedPages[currentPage].generations[currentGen].push({
      emoji: '➕',
      title: 'New Option',
      subtext: 'Add details for this option'
    })
    setPages(updatedPages)
  }

  const handleNewPage = () => {
    setPages([...pages, { question: '', generations: [], currentGeneration: 0 }])
    setCurrentPage(pages?.length)
  }

  const handleCreateSurvey = () => {
    const surveyLinks = pages.map((page, index) => `https://example.com/survey/${index + 1}`)
    setSurveyLinks(surveyLinks)
  }

  const handleNewGeneration = () => {
    const updatedPages = [...pages]
    updatedPages[currentPage].generations.push([])
    updatedPages[currentPage].currentGeneration = updatedPages[currentPage].generations?.length - 1
    setPages(updatedPages)
    simulateAIGeneration()
  }

  const handleSwitchGeneration = (genIndex) => {
    const updatedPages = [...pages]
    updatedPages[currentPage].currentGeneration = genIndex
    setPages(updatedPages)
  }

  const currentSurveyPage = pages[currentPage]
  const currentGeneration = currentSurveyPage.generations[currentSurveyPage.currentGeneration]

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 min-h-screen relative">
      <button
        onClick={() => {
            
          // always go to an existing nearest page
          if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
          }
          
          setPages(pages.filter((_, index) => index !== currentPage))
        }}
        disabled={pages.length <= 1 || isGenerating}
        className="absolute top-4 right-4 px-4 py-2 bg-white hover:bg-gray-300 disabled:bg-gray-100 text-gray-700 font-semibold rounded-lg shadow-md transition-colors disabled:bg-gray-100  disabled:cursor-not-allowed"
      >
        ❌
      </button>
      <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
        AI-Powered Survey Creator
      </h1>
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="mb-6">
          <div className="flex justify-end items-center space-x-2 ">
            <div className="pr-1">Attempts</div>
            {currentSurveyPage.generations.map((_, index) => (
              <button
                key={index}
                onClick={() => handleSwitchGeneration(index)}
                className={`px-3 py-1 rounded-full font-semibold ${
                  currentSurveyPage.currentGeneration === index
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
            Survey Question
          </label>
          <div className="flex items-center bg-gray-100 rounded-lg p-2">
            <MessageSquare size={24} className="text-gray-400 ml-3 mr-2" />
            <input
              id="question"
              type="text"
              value={currentSurveyPage.question}
              onChange={(e) => {
                const updatedPages = [...pages]
                updatedPages[currentPage].question = e.target.value || 'Enter your survey question...'
                setPages(updatedPages)
              }}
              placeholder="Enter your survey question..."
              className="flex-grow bg-transparent border-none focus:outline-none px-4 py-3 text-lg"
            />
          </div>
        </div>

        <button
          onClick={handleNewGeneration}
          disabled={isGenerating || !currentSurveyPage.question}
          className={`w-full py-3 rounded-lg text-white font-semibold transition-all duration-300 ${
            isGenerating || !currentSurveyPage.question
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

        {currentSurveyPage.question && currentGeneration?.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 text-indigo-700">Survey Preview</h2>
            <div className="bg-indigo-50 rounded-lg p-4 mb-6">
              <p className="text-lg font-medium text-indigo-800">{currentSurveyPage.question}</p>
            </div>
            <div className="space-y-4">
              {currentGeneration.map((option, index) => (
                <EditableOption
                  key={index}
                  option={option}
                  index={index}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  showSuggestions={true}
                />
              ))}
            </div>
          </div>
        )}

        {currentGeneration?.length > 0 && !isGenerating && (
          <button
            onClick={handleAddOption}
            className="mt-4 flex items-center justify-center w-full py-3 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 font-semibold transition-colors"
          >
            <Plus size={18} className="mr-2" /> Add Custom Option
          </button>
        )}
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 0}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg shadow-md transition-colors disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          <ArrowLeft size={18} className="inline" /> Previous Page
        </button>

        <div className="flex space-x-2">
          {pages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`px-3 py-1 rounded-full font-semibold ${
                currentPage === index ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button
          onClick={handleNewPage}
          className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg shadow-md transition-colors"
        >
          New Page <ArrowRight size={18} className="inline" />
        </button>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={handleCreateSurvey}
          className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
        >
          Create Survey
        </button>
      </div>

      {surveyLinks?.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-indigo-700">Survey Links</h2>
          <ul className="space-y-2">
            {surveyLinks.map((link, index) => (
              <li key={index} className="bg-indigo-50 rounded-lg p-4">
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-medium text-indigo-800 hover:underline"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default EditableAISurveyCreator
