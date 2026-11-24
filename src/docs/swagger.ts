export const swaggerDocument = {
    openapi: "3.0.0",
    info: {
        title: "Taskly API",
        version: "1.0.0",
        description: "API REST para gerenciamento de tarefas"
    },

    components: {
        schemas: {
            Tarefa: {
                type: "object",
                properties: {
                    id: {
                        type: "integer",
                        example: 1
                    },
                    titulo: {
                        type: "string",
                        example: "Estudar backend"
                    },
                    concluida: {
                        type: "boolean",
                        example: false
                    }
                }
            }
        }
    },

    paths: {
        "/tarefas": {
            get: {
                tags: ["Tarefas"],
                summary: "Listar todas as tarefas",
                responses: {
                    200: {
                        description: "Tarefas listadas com sucesso",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/Tarefa"
                                    }
                                }
                            }
                        }
                    }
                }
            },

            post: {
                tags: ["Tarefas"],
                summary: "Criar uma tarefa",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["titulo"],
                                properties: {
                                    titulo: {
                                        type: "string",
                                        example: "Estudar Java"
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Tarefa criada com sucesso"
                    },
                    400: {
                        description: "Título inválido"
                    }
                }
            }
        },

        "/tarefas/{id}": {
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "integer",
                        minimum: 1
                    }
                }
            ],

            get: {
                tags: ["Tarefas"],
                summary: "Buscar uma tarefa pelo ID",
                responses: {
                    200: {
                        description: "Tarefa encontrada"
                    },
                    400: {
                        description: "ID inválido"
                    },
                    404: {
                        description: "Tarefa não encontrada"
                    }
                }
            },

            put: {
                tags: ["Tarefas"],
                summary: "Atualizar uma tarefa",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["titulo", "concluida"],
                                properties: {
                                    titulo: {
                                        type: "string",
                                        example: "Estudar Spring Boot"
                                    },
                                    concluida: {
                                        type: "boolean",
                                        example: true
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Tarefa atualizada com sucesso"
                    },
                    400: {
                        description: "Dados inválidos"
                    },
                    404: {
                        description: "Tarefa não encontrada"
                    }
                }
            },

            patch: {
                tags: ["Tarefas"],
                summary: "Atualizar o status de uma tarefa",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["concluida"],
                                properties: {
                                    concluida: {
                                        type: "boolean",
                                        example: true
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Status atualizado com sucesso"
                    },
                    400: {
                        description: "Dados inválidos"
                    },
                    404: {
                        description: "Tarefa não encontrada"
                    }
                }
            },

            delete: {
                tags: ["Tarefas"],
                summary: "Excluir uma tarefa",
                responses: {
                    200: {
                        description: "Tarefa excluída com sucesso"
                    },
                    400: {
                        description: "ID inválido"
                    },
                    404: {
                        description: "Tarefa não encontrada"
                    }
                }
            }
        }
    }
};