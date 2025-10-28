import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTickets } from '../context/TicketContext';
import { Dialog } from '@headlessui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const TicketSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .required('Title is required'),
  description: Yup.string()
    .min(10, 'Description must be at least 10 characters')
    .required('Description is required'),
  status: Yup.string()
    .oneOf(['open', 'in_progress', 'closed'], 'Invalid status')
    .required('Status is required'),
});

export default function Tickets() {
  const { tickets, createTicket, updateTicket, deleteTicket } = useTickets();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      status: 'open',
    },
    validationSchema: TicketSchema,
    onSubmit: (values, { resetForm }) => {
      if (editingTicket) {
        updateTicket(editingTicket.id, values);
        setEditingTicket(null);
      } else {
        createTicket(values);
      }
      resetForm();
      setIsCreateModalOpen(false);
    },
  });

  const handleEdit = (ticket) => {
    setEditingTicket(ticket);
    formik.setValues(ticket);
    setIsCreateModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      deleteTicket(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="container-max h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={() => navigate('/dashboard')} className="text-gray-600 hover:text-gray-900">
              ← Back to Dashboard
            </button>
            <h1 className="text-xl font-bold text-gray-900">Ticket Management</h1>
          </div>
          <button onClick={() => {
            setEditingTicket(null);
            formik.resetForm();
            setIsCreateModalOpen(true);
          }} className="btn-primary">
            Create New Ticket
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container-max py-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="card">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-medium text-gray-900">{ticket.title}</h3>
                <span className={`
                  status-tag
                  ${ticket.status === 'open' ? 'status-tag-open' : ''}
                  ${ticket.status === 'in_progress' ? 'status-tag-in-progress' : ''}
                  ${ticket.status === 'closed' ? 'status-tag-closed' : ''}
                `}>
                  {ticket.status.replace('_', ' ')}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-600">{ticket.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  Created: {new Date(ticket.createdAt).toLocaleDateString()}
                </span>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(ticket)}
                    className="text-primary-600 hover:text-primary-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(ticket.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Create/Edit Modal */}
      <Dialog
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-md rounded-lg bg-white p-6">
            <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
              {editingTicket ? 'Edit Ticket' : 'Create New Ticket'}
            </Dialog.Title>
            
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  {...formik.getFieldProps('title')}
                  className="form-input mt-1"
                />
                {formik.touched.title && formik.errors.title && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.title}</p>
                )}
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={3}
                  {...formik.getFieldProps('description')}
                  className="form-input mt-1"
                />
                {formik.touched.description && formik.errors.description && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.description}</p>
                )}
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  id="status"
                  {...formik.getFieldProps('status')}
                  className="form-input mt-1"
                >
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="closed">Closed</option>
                </select>
                {formik.touched.status && formik.errors.status && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.status}</p>
                )}
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingTicket ? 'Update Ticket' : 'Create Ticket'}
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}