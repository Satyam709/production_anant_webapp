'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import GradientButton from '@/components/ui/GradientButton'

interface TeamCreateFormProps {
  onSubmit: (formData: { team_name: string }) => Promise<void>
  loading: boolean
  onCancel: () => void
}

const TeamCreateForm: React.FC<TeamCreateFormProps> = ({ onSubmit, loading, onCancel }) => {
  const [teamName, setTeamName] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!teamName.trim()) return
    
    setError('')
    try {
      await onSubmit({ team_name: teamName.trim() })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create team')
    }
  }

  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-xl p-8 border border-gray-800">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Create New Team</h2>
        <button
          onClick={onCancel}
          className="p-2 rounded-full hover:bg-gray-800/50 transition-all"
          type="button"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="teamName" className="block text-sm font-medium mb-2">
            Team Name
          </label>
          <input
            type="text"
            id="teamName"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Enter team name"
            className="w-full px-4 py-2 rounded-lg bg-black/30 border border-gray-800 focus:border-primary-blue focus:ring-1 focus:ring-primary-blue outline-none transition-all"
            disabled={loading}
          />
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </div>

        <div className="flex gap-4">
          <button type="submit">
            <GradientButton
              disabled={loading || !teamName.trim()}
            >
              {loading ? 'Creating...' : 'Create Team'}
            </GradientButton>
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default TeamCreateForm
