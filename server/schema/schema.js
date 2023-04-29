// Mongoose models
const Project = require('../models/Project')
const Client = require('../models/client')

const {GraphQLSchema,GraphQLObjectType,GraphQLNonNull,GraphQLString, GraphQLScalarType, GraphQLList, GraphQLID, GraphQLEnumType} = require('graphql')

const ClientType = new GraphQLObjectType({
    name:'Clients',
    
    fields:() => ({
        id:{type:new GraphQLNonNull(GraphQLID)},
        name:{type:new GraphQLNonNull(GraphQLString)},
        email:{type:new GraphQLNonNull(GraphQLString)},
        phone:{type:new GraphQLNonNull(GraphQLString)},
    })
})

const ProjectType = new GraphQLObjectType({
    name:'Projects',
    fields:() => ({
        id: {type: new GraphQLNonNull(GraphQLID)},
        clientId: {type: new GraphQLNonNull(GraphQLID)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        description:{type: GraphQLString},
        status:{type: new GraphQLNonNull(GraphQLString)},
        client:{
            type:ClientType,
            resolve:(parent,args) => {
                return Client.findById(parent.clientId)
            }
        }
    })
})


const RootQuery = new GraphQLObjectType({
    name:"RootQueryType",
    fields:() => ({
        clients:{
            type: new GraphQLList(ClientType),
            resolve: () => Client.find()
        },
        client:{
            type:ClientType,
            args:{id:{type: GraphQLID}},
            resolve:(parent,args) => {
                return Client.findById(args.id)
            }
        },
        projects:{
            type: new GraphQLList(ProjectType),
            resolve:() => Project.find()
        },
        project:{
            type: ProjectType,
            args:{id:{type: GraphQLID}},
            resolve:(parent,args) => {
                return Project.findById(args.id)
            }
        }
    })
})

const RootMutation = new GraphQLObjectType({
    name:'RootMutation',
    fields:() => ({
        // Add a client
        addClient:{
            type:ClientType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                email:{type:new GraphQLNonNull(GraphQLString)},
                phone:{type:new GraphQLNonNull(GraphQLString)}
            },
            resolve:(parent,args) => {
                const newClient = new Client({
                    name:args.name,
                    email:args.email,
                    phone:args.phone
                })

                return newClient.save()
            }
        },
        // Delete a client
        deleteClient:{
            type:ClientType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLID)}
            },
            resolve:(parent,args) => {
                Project.find({clientId:args.id}).then((projects) => {
                    projects.forEach(project => (
                        project.deleteOne()
                    ))
                })
                return Client.findByIdAndRemove(args.id)
            }
            
        },
        // Add a Project
        addProject:{
            type: ProjectType,
            args:{
                name:{type: new GraphQLNonNull(GraphQLString)},
                description:{type: new GraphQLNonNull(GraphQLString)},
                status:{
                    type: new GraphQLEnumType({
                        name:"ProjectStatus",
                        values:{
                            'new':{value:'Not Started'},
                            'progress':{value:'In Progress'},
                            'completed':{value:'Completed'}
                        }
                    }),
                    defaultValue:'Not Started'
                    
                },
                clientId:{type:new GraphQLNonNull(GraphQLID)}
            },
            resolve:(parent,args) => {
                const newProject = new Project({
                    name:args.name,
                    description:args.description,
                    status:args.status,
                    clientId:args.clientId
                })

                return newProject.save()
            }
        },
        // Delete a Project
        deleteProject:{
            type: ProjectType,
            args:{
                id: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve:(parent,args) => {
                return Project.findByIdAndRemove(args.id)
            }
        },

        // Update a Project
        updateProject:{
            type:ProjectType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLID)},
                name:{type:GraphQLString},
                description:{type:GraphQLString},
                status:{
                    type: new GraphQLEnumType({
                        name:'ProjectStatusUpdate',
                        values:{
                            'new': {value:"Not Started"},
                            'progress': {value:"In Progress"},
                            'completed': {value: "Completed"}
                        }
                    })
                }
                
            },
            resolve:(parent,args) => {
                return Project.findByIdAndUpdate(args.id,{
                    $set:{
                        name:args.name,
                        description:args.description,
                        status:args.status
                    }
                },
                { new : true }
                )
            }
        }

    })
})


const schema = new GraphQLSchema({
    query:RootQuery,
    mutation:RootMutation
})

module.exports = schema

