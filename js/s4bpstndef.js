'use strict'

var modelDataItem = {
    'PhoneCount': {
        'Property': { 'min': 0, 'max': 999999, 'step': 1, 'value': 10 },
        'ConnectedIDs': ['ir_PhoneCount', 'in_PhoneCount']
    },
    'AvgCallsPM': {
        'Property': { 'min': 0, 'max': 9999, 'step': 1, 'value': 100 },
        'ConnectedIDs': ['ir_AvgCallsPM', 'in_AvgCallsPM']
    },
    'AvgCallDurationPC': {
        'Property': { 'min': 0, 'max': 99, 'step': 0.1, 'value': 10 },
        'ConnectedIDs': ['ir_AvgCallDurationPC', 'in_AvgCallDurationPC']
    },
    'InboundCallsP': {
        'Property': { 'min': 0, 'max': 100, 'step': 1, 'value': 75 },
        'ConnectedIDs': ['ir_InboundCallsP', 'in_InboundCallsP']
    },
    'OutboundCallsP': {
        'Property': { 'min': 0, 'max': 100, 'step': 1, 'value': 25 },
        'ConnectedIDs': ['m_OutboundCallsP']
    },
    'LocalCallsP': {
        'Property': { 'min': 0, 'max': 100, 'step': 1, 'value': 70 },
        'ConnectedIDs': ['ir_LocalCallsP', 'in_LocalCallsP']
    },
    'IntCallsP': {
        'Property': { 'min': 0, 'max': 100, 'step': 1, 'value': 30 },
        'ConnectedIDs': ['m_IntCallsP']
    },
    'PSTNMRC': {
        'Property': { 'min': 9, 'max': 9999999, 'step': 1, 'value': 10000 },
        'ConnectedIDs': ['ir_PSTNMRC', 'in_PSTNMRC']
    },
    'LocalInboundCPM': {
        'Property': { 'min': 0, 'max': 99, 'step': 0.01, 'value': 1 },
        'ConnectedIDs': ['ir_LocalInboundCPM', 'in_LocalInboundCPM']
    },
    'LocalInboundFMPU': {
        'Property': { 'min': 0, 'max': 9999, 'step': 1, 'value': 0 },
        'ConnectedIDs': ['ir_LocalInboundFMPU', 'in_LocalInboundFMPU']
    },
    'LocalOutboundCPM': {
        'Property': { 'min': 0, 'max': 99, 'step': 0.01, 'value': 1 },
        'ConnectedIDs': ['ir_LocalOutboundCPM', 'in_LocalOutboundCPM']
    },
    'LocalOutboundFMPU': {
        'Property': { 'min': 0, 'max': 9999, 'step': 1, 'value': 0 },
        'ConnectedIDs': ['ir_LocalOutboundFMPU', 'in_LocalOutboundFMPU']
    },
    'IntInboundCPM': {
        'Property': { 'min': 0, 'max': 99, 'step': 0.01, 'value': 1 },
        'ConnectedIDs': ['ir_IntInboundCPM', 'in_IntInboundCPM']
    },
    'IntInboundFMPU': {
        'Property': { 'min': 0, 'max': 9999, 'step': 1, 'value': 0 },
        'ConnectedIDs': ['ir_IntInboundFMPU', 'in_IntInboundFMPU']
    },
    'IntOutboundCPM': {
        'Property': { 'min': 0, 'max': 99, 'step': 0.01, 'value': 1 },
        'ConnectedIDs': ['ir_IntOutboundCPM', 'in_IntOutboundCPM']
    },
    'IntOutboundFMPU': {
        'Property': { 'min': 0, 'max': 9999, 'step': 1, 'value': 0 },
        'ConnectedIDs': ['ir_IntOutboundFMPU', 'in_IntOutboundFMPU']
    },

    'LocalCallingPackageP': {
        'Property': { 'min': 0, 'max': 100, 'step': 1, 'value': 50 },
        'ConnectedIDs': ['ir_LocalCallingPackageP', 'in_LocalCallingPackageP']
    },
    'IntCallingPackageP': {
        'Property': { 'min': 0, 'max': 100, 'step': 1, 'value': 30 },
        'ConnectedIDs': ['ir_IntCallingPackageP', 'in_IntCallingPackageP']
    },
    'NoCallingPackageP': {
        'Property': { 'min': 0, 'max': 100, 'step': 1, 'value': 20 },
        'ConnectedIDs': ['m_NoCallingPackageP']
    },
    'LocalCallingPackageDiscountP': {
        'Property': { 'min': 0, 'max': 100, 'step': 1, 'value': 0 },
        'ConnectedIDs': ['ir_LocalCallingPackageDiscountP', 'in_LocalCallingPackageDiscountP']
    },
    'IntCallingPackageDiscountP': {
        'Property': { 'min': 0, 'max': 100, 'step': 1, 'value': 0 },
        'ConnectedIDs': ['ir_IntCallingPackageDiscountP', 'in_IntCallingPackageDiscountP']
    },
    'MinutesPerUserPackage': {
        'Property': { 'min': 0, 'max': 9999, 'step': 1, 'value': 3000 },
        'ConnectedIDs': ['ir_MinutesPerUserPackage', 'in_MinutesPerUserPackage']
    },
    'AzureExpressRouteCPM': {
        'Property': { 'min': 0, 'max': 99999, 'step': 1, 'value': 10000 },
        'ConnectedIDs': ['ir_AzureExpressRouteCPM', 'in_AzureExpressRouteCPM']
    },
}

var modelDataGroups = {
    'CallsIOP': { 'active': ['InboundCallsP', 'OutboundCallsP'] },
    'CallsP': { 'active': ['LocalCallsP', 'IntCallsP'] },
    'CallingPackage': {
        'active': ['LocalCallingPackageP', 'IntCallingPackageP'],
        'buffer': 'NoCallingPackageP'
    }
}