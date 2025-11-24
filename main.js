// main.js - 确保预设正确加载
const { 
    InstanceBase, 
    Regex, 
    runEntrypoint, 
    InstanceStatus, 
    UDPHelper 
} = require('@companion-module/base');

const UpgradeScripts = require('./upgrades.js');
const UpdateActions = require('./actions.js');
const UpdatePresets = require('./presets.js');

class VISCAInstance extends InstanceBase {
    constructor(internal) {
        super(internal);
        this.sequenceNumber = 0;
        this.udp = null;
        this.config = {};
    }

    async init(config) {
        this.config = config;
        this.updateStatus(InstanceStatus.Ok);
        this.initializeConnection();
        this.updateActions();
        this.updatePresets();
        
        // 添加调试信息
        this.log('info', 'Module initialized with presets');
    }

    initializeConnection() {
        this.cleanupPreviousConnection();
        
        if (this.config.host && this.config.port) {
            this.setupUDPConnection();
        }
    }

    cleanupPreviousConnection() {
        if (this.udp) {
            this.udp.destroy();
            this.udp = null;
        }
    }

    setupUDPConnection() {
        try {
            this.udp = new UDPHelper(this.config.host, parseInt(this.config.port));
            
            this.udp.on('error', (error) => {
                this.log('error', `Network error: ${error.message}`);
                this.updateStatus(InstanceStatus.UnknownError, error.message);
            });

            this.udp.on('data', (data) => {
                const hexString = data.toString('hex');
                this.log('debug', `Received: ${this.formatHex(hexString)}`);
            });

            this.log('info', 'UDP connection initialized');
            
        } catch (error) {
            this.log('error', `Failed to initialize UDP: ${error.message}`);
        }
    }

    sendCommand(payload) {
        if (!this.udp) {
            this.log('error', 'UDP connection not initialized');
            return;
        }

        let formattedPayload = payload;

        const commandBuffer = Buffer.from(formattedPayload, 'hex');
        this.udp.send(commandBuffer);
        
        this.log('debug', `Sent: ${this.formatHex(commandBuffer.toString('hex'))}`);//tony debug to info
    }

    formatHex(hex) {
        const matches = hex.match(/.{1,2}/g);
        return matches ? matches.join(' ') : hex;
    }

    async destroy() {
        this.cleanupPreviousConnection();
    }

    async configUpdated(config) {
        const oldConfig = this.config;
        this.config = config;
        
        if (oldConfig.host !== config.host || oldConfig.port !== config.port) {
            this.initializeConnection();
        }
        
        this.updatePresets();
    }

    getConfigFields() {
        return [
            {
                type: 'static-text',
                id: 'info',
                width: 12,
                label: 'Information',
                value: 'This module controls PTZ cameras with VISCA over IP protocol'
            },
            {
                type: 'textinput',
                id: 'host',
                label: 'Target IP',
                width: 8,
                regex: Regex.IP,
            },
            {
                type: 'textinput',
                id: 'port',
                label: 'Target Port',
                width: 4,
                default: '52381',
                regex: Regex.PORT,
            },
            // {
            //     type: 'checkbox',
            //     id: 'isviscaoverip',
            //     label: 'VISCA over IP',
            //     default: false
            // },
        ];
    }

    updateActions() {
        try {
            UpdateActions(this);
            this.log('info', 'Actions updated successfully');
        } catch (error) {
            this.log('error', `Failed to update actions: ${error.message}`);
        }
    }

    updatePresets() {
        try {
            UpdatePresets(this);
            this.log('info', 'Presets updated successfully');
        } catch (error) {
            this.log('error', `Failed to update presets: ${error.message}`);
        }
    }
}

runEntrypoint(VISCAInstance, UpgradeScripts);