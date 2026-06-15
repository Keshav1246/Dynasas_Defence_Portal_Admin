import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Select } from '../ui/Select';
import { Label } from '../ui/Label';
import { FileUpload } from '../ui/FileUpload';
import { Button } from '../ui/Button';

export const AddPartnerModal = ({ isOpen, onClose, onSave, editingPartner }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Aerospace',
    status: 'ACTIVE',
    description: '',
    website: '',
    logo: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (editingPartner) {
        setFormData({
          name: editingPartner.name || '',
          category: editingPartner.category || 'Aerospace',
          status: (editingPartner.status && editingPartner.status.toUpperCase() === 'INACTIVE') ? 'INACTIVE' : 'ACTIVE',
          description: editingPartner.description || '',
          website: editingPartner.website || editingPartner.url || '',
          logo: editingPartner.logo || ''
        });
      } else {
        setFormData({
          name: '',
          category: 'Aerospace',
          status: 'ACTIVE',
          description: '',
          website: '',
          logo: ''
        });
      }
    }
  }, [isOpen, editingPartner]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      await onSave(formData);
      onClose();
    } catch (err) {
      console.error(err);
      alert('Failed to save partner: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-md">
      <ModalHeader title={editingPartner ? "Edit Partner" : "Add New Partner"} onClose={onClose} />
      <ModalBody>
        <div className="space-y-5">
          <div>
            <Label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Partner Logo</Label>
            <FileUpload 
              label="Upload partner logo" 
              helperText="SVG, PNG — transparent background"
              className="mt-1"
            />
          </div>

          <div>
            <Label>Partner Name</Label>
            <Input 
              name="name" 
              placeholder="e.g. Lockheed Martin" 
              value={formData.name} 
              onChange={handleChange} 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Category</Label>
              <Select name="category" value={formData.category} onChange={handleChange}>
                <option value="Aerospace">Aerospace</option>
                <option value="Defense">Defense</option>
                <option value="Security">Security</option>
                <option value="Technology">Technology</option>
                <option value="Space">Space</option>
              </Select>
            </div>
            <div>
              <Label>Status</Label>
              <Select name="status" value={formData.status} onChange={handleChange}>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </Select>
            </div>
          </div>

          <div>
            <Label>Description</Label>
            <Textarea 
              name="description" 
              placeholder="Brief description of the partnership..." 
              value={formData.description} 
              onChange={handleChange} 
            />
          </div>

          <div>
            <Label>Website URL</Label>
            <Input 
              name="website" 
              placeholder="https://partner.com" 
              value={formData.website} 
              onChange={handleChange} 
            />
          </div>
        </div>
      </ModalBody>
      <ModalFooter className="bg-white border-t-0 pt-0">
        <Button variant="outline" onClick={onClose} className="px-6 text-gray-600 rounded-full" disabled={isSubmitting}>Cancel</Button>
        <Button 
          variant="primary" 
          onClick={handleSave} 
          isLoading={isSubmitting}
          className="px-6 rounded-full" 
          leftIcon={!isSubmitting && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>}
        >
          {editingPartner ? 'Update Partner' : 'Save Partner'}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

