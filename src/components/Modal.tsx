import React from 'react';

export default function Modal({
  open,
  status, // 'success' | 'error'
  message,
  onClose,
}: {
  open: boolean,
  status: 'success' | 'error',
  message: string,
  onClose: () => void
}) {
  if (!open) return null;
  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 1000,
        left: 0, top: 0, right: 0, bottom: 0,
        background: 'rgba(0,0,0,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: status === 'success' ? '#4caf50' : '#f44336',
          color: '#fff',
          borderRadius: 12,
          padding: '32px 36px',
          minWidth: 120,
          minHeight: 80,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
          cursor: 'pointer'
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ marginBottom: 8 }}>
          {status === 'success' ? (
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="28" cy="28" r="28" fill="white"/>
              <path d="M18 29L25 36L38 22" stroke="#4caf50" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="28" cy="28" r="28" fill="white"/>
              <path d="M20 20L36 36M36 20L20 36" stroke="#f44336" strokeWidth="4" strokeLinecap="round"/>
            </svg>
          )}
        </div>
        <div style={{ fontSize: 18, fontWeight: 500 }}>{message}</div>
      </div>
    </div>
  );
} 