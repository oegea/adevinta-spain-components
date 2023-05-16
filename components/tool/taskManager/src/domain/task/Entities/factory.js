import {SharedValueObjectsFactory} from '../../shared/ValueObjects/factory.js'
import {TaskValueObjectsFactory} from '../ValueObjects/factory.js'
import {TaskEntity} from './TaskEntity.js'
import {WorkTaskEntity} from './WorkTaskEntity.js'

export class TaskEntitiesFactory {
  static taskEntity = ({
    config,
    id,
    log,
    name,
    priority,
    work,
    status,
    createdAt,
    finishedAt = null,
    updatedAt = null
  }) =>
    new TaskEntity({
      config,
      createdAt: SharedValueObjectsFactory.dateSharedValueObject(createdAt),
      finishedAt: SharedValueObjectsFactory.dateSharedValueObject(finishedAt),
      id: SharedValueObjectsFactory.idSharedValueObject(id),
      log: SharedValueObjectsFactory.stringSharedValueObject(log),
      name: SharedValueObjectsFactory.stringSharedValueObject(name),
      priority: TaskValueObjectsFactory.priorityTaskValueObject(
        config,
        priority
      ),
      status: TaskValueObjectsFactory.statusTaskValueObject(config, status),
      updatedAt: SharedValueObjectsFactory.dateSharedValueObject(updatedAt),
      work: TaskValueObjectsFactory.workListTaskValueObject(config, work)
    })

  static workTaskEntity = ({
    config,
    autoRetry,
    createdAt,
    finishedAt = null,
    id,
    log,
    name,
    onComplete,
    onError,
    parentId = null,
    percentage,
    start,
    status,
    updatedAt = null
  }) =>
    new WorkTaskEntity({
      autoRetry: SharedValueObjectsFactory.numberSharedValueObject(autoRetry),
      config,
      createdAt: SharedValueObjectsFactory.dateSharedValueObject(createdAt),
      finishedAt: SharedValueObjectsFactory.dateSharedValueObject(finishedAt),
      id: SharedValueObjectsFactory.idSharedValueObject(id),
      log: SharedValueObjectsFactory.stringSharedValueObject(log),
      name: SharedValueObjectsFactory.stringSharedValueObject(name),
      onComplete:
        SharedValueObjectsFactory.callbackSharedValueObject(onComplete),
      onError: SharedValueObjectsFactory.callbackSharedValueObject(onError),
      parentId: SharedValueObjectsFactory.idSharedValueObject(parentId),
      percentage: SharedValueObjectsFactory.numberSharedValueObject(percentage),
      start: SharedValueObjectsFactory.callbackSharedValueObject(start),
      status: TaskValueObjectsFactory.statusTaskValueObject(config, status),
      updatedAt: SharedValueObjectsFactory.dateSharedValueObject(updatedAt)
    })
}
